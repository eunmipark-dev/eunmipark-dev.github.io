/*
https://docs.mapbox.com/mapbox-gl-js/example/add-3d-model/
*/

import mapboxgl, { MercatorCoordinate, type LngLatLike } from 'mapbox-gl'
import * as THREE from 'three'
import type MapManager from './MapManager'
import {
  //   _VS,
  //   _FS,
  //   _FS_fill_blue,
  _VS_scale,
  _FS_scale,
  _VS_hemisphere,
  _FS_hemisphere,
  _VS_building,
  _FS_building,
} from './shader_bw'
import LabelManager from './managers/LabelManager'
import BuildingManager from './managers/BuildingManager'
import HexManager from './managers/HexManager'
import { landmarkInfos } from './data'

interface layerProps {
  mapManager: MapManager
  modelOrigin: LngLatLike
}

// 3d layer
interface ModelTransform {
  translateX: number
  translateY: number
  translateZ: number
  rotateX: number
  rotateY: number
  rotateZ: number
  scale: number
}

const landmarks: THREE.Mesh[] = []
const params = {
  rings: 90,
  hexColor: '#00ffff',
  //hexColor: '#ffffff',
  innerColor: '#ffffff',
}

const uniforms = {
  uColor: { value: new THREE.Color(params.hexColor) },
  uInnerColor: { value: new THREE.Color(params.innerColor) },
  uLandmarks: {
    value: [
      new THREE.Vector3(0, 0, 0), //랜드마크1 월드 포지션
      new THREE.Vector3(0, 0, 0), //랜드마크2 월드 포지션
      new THREE.Vector3(0, 0, 0), //랜드마크3 월드 포지션
    ],
  },
  uActivePos: { value: new THREE.Vector3(0, -100, 0) },
  uActiveProgress: { value: 0.0 },
  uPrevActivePos: { value: new THREE.Vector3(0, -100, 0) },
  uPrevActiveProgress: { value: 0.0 },
  uIsActive: { value: 0.0 },
  uCenter: { value: new THREE.Vector3(0, 0, 0) },
  uScale: { value: 1.0 }, // 추가: 기본 스케일,
  uHoverPos: { value: new THREE.Vector3(9999, 9999, 0) },
  uHoverAlpha: { value: 0.0 },
  uTime: { value: 0.0 }, // 추가: 시간 정보
}

let isAnimating = false
const groundPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
const intersectionPoint = new THREE.Vector3()

export default class {
  id = '3d-model'
  type = 'custom'
  renderingMode: string = '3d'

  scene: THREE.Scene = new THREE.Scene()
  camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera()

  renderer!: THREE.WebGLRenderer
  raycaster: THREE.Raycaster = new THREE.Raycaster()
  mbox!: mapboxgl.Map
  mapManager: MapManager

  modelTransform: ModelTransform

  selectedObject: THREE.Mesh | null = null

  private labelManager: LabelManager
  private buildingManager: BuildingManager
  private hexManager: HexManager
  private selectedIdx: number | null = null

  constructor(props: layerProps) {
    const { mapManager, modelOrigin } = props

    window.addEventListener('resize', this.resizeWindow.bind(this), false)

    this.mapManager = mapManager
    this.mbox = mapManager.map

    const modelAltitude = 0
    const modelRotate = [Math.PI / 2, 0, 0]

    const modelAsMercatorCoordinate = MercatorCoordinate.fromLngLat(
      modelOrigin,
      modelAltitude,
    )

    this.modelTransform = {
      translateX: modelAsMercatorCoordinate.x,
      translateY: modelAsMercatorCoordinate.y,
      translateZ: modelAsMercatorCoordinate.z ?? 0,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      /* Since the 3D model is in real world meters, a scale transform needs to be
       * applied since the CustomLayerInterface expects units in MercatorCoordinates.
       */
      scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
      //scale: 5.4184e-8
    }

    // 랜드마크 월드 포지션 유니폼 업데이트
    landmarkInfos.forEach((landmark, i) => {
      const mapPos = this.mapManager.getModelPosition(
        landmark.lnglat as mapboxgl.LngLatLike,
        0,
      )
      uniforms.uLandmarks.value[i].set(mapPos.x, mapPos.y, mapPos.z)
      //}
    })

    // 매니저 클래스 인스턴스화 (중복 생성 방지)
    this.labelManager = new LabelManager(this.mbox.getContainer())
    this.labelManager.createLabels(landmarkInfos)

    this.buildingManager = new BuildingManager(
      uniforms.uLandmarks.value,
      uniforms,
    )
    this.scene.add(...this.buildingManager.meshes)

    this.hexManager = new HexManager(90, uniforms)
    this.scene.add(this.hexManager.mesh)

    this.mbox.on('click', e => this.handleMapClick(e))
  }

  getNearestLandmark = (mouse: THREE.Vector2) => {
    this.raycaster.setFromCamera(mouse, this.camera)

    // 레이와 바닥 평면의 교차점 구하기
    if (this.raycaster.ray.intersectPlane(groundPlane, intersectionPoint)) {
      // 쉐이더의 vInstPos / uScale과 맞추기 위해 현재 중심점 오프셋 등을 고려하여 역계산 필요할 수 있음
      // 여기서는 간단히 로컬 좌표계 거리만 체크

      let closestIdx = -1
      let minDistance = Infinity

      // 줌 레벨에 따라 유동적인 선택 반경 설정 (예: 헥사곤 6개 거리)
      const zoomScale = uniforms.uScale.value
      const radiusFactor = Math.pow(zoomScale, 2) * 0.5 + 1.0
      const selectionThreshold = 5.0 * radiusFactor

      uniforms.uLandmarks.value.forEach((pos: THREE.Vector3, i: number) => {
        const d = intersectionPoint.distanceTo(pos)
        const scaledD = d / uniforms.uScale.value

        if (scaledD < 40 && d < minDistance) {
          minDistance = d
          closestIdx = i
        }
      })

      return closestIdx !== -1
        ? { index: closestIdx, pos: uniforms.uLandmarks.value[closestIdx] }
        : null
    }
    return null
  }

  private handleMapClick(e: any) {
    const mouse = new THREE.Vector2()

    //@ts-ignore
    mouse.x = (e.point.x / this.mbox.transform.width) * 2 - 1
    //@ts-ignore
    mouse.y = 1 - (e.point.y / this.mbox.transform.height) * 2

    const hit = this.getNearestLandmark(mouse)
    if (hit) this.selectLandmark(hit.index)
    else this.deselectAll()
  }

  private deselectAll() {
    this.selectedIdx = null

    // 1. 매니저들을 통한 시각적 초기화
    this.buildingManager.setHighlight(null)
    this.labelManager.updateSelection(null)

    // 2. 애니메이션 상태 초기화 (응축 효과 제거)
    // 현재 위치 정보를 이전 위치로 밀어내어 '확산(Burst)' 효과가 일어나게 합니다.
    uniforms.uPrevActivePos.value.copy(uniforms.uActivePos.value)
    uniforms.uPrevActiveProgress.value = uniforms.uActiveProgress.value

    // 현재 위치는 보이지 않는 곳으로 설정
    uniforms.uActivePos.value.set(0, -9999, 0)
    uniforms.uActiveProgress.value = 0.0

    // 4. 애니메이션 플래그 활성화 및 이벤트 발송
    isAnimating = true
    this.mbox.fire('landmarkSelected', { index: null })
  }

  onAdd(map: mapboxgl.Map, gl: any) {
    this.renderer = new THREE.WebGLRenderer({
      canvas: map.getCanvas(),
      context: gl,
      antialias: true,
    })
    this.renderer.autoClear = false

    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(0, -70, 100).normalize()
    this.scene.add(light, new THREE.AmbientLight(0xffffff, 0.3))

    this.scene.add(...this.buildingManager.meshes)
    this.scene.add(this.hexManager.mesh)

    this.mbox.on('click', e => this.handleMapClick(e))

    const animate = () => {
      requestAnimationFrame(animate)
      if (isAnimating) {
        // 현재 선택된 효과는 응축 (0 -> 1)
        if (uniforms.uActiveProgress.value < 1.0) {
          uniforms.uActiveProgress.value += 0.03
        }

        // 이전 선택된 효과는 확산하며 소멸 (기존 값 -> 0)
        if (uniforms.uPrevActiveProgress.value > 0.0) {
          uniforms.uPrevActiveProgress.value -= 0.02 // 퍼지는 속도
        }

        // 둘 다 완료되면 애니메이션 중지
        if (
          uniforms.uActiveProgress.value >= 1.0 &&
          uniforms.uPrevActiveProgress.value <= 0.0
        ) {
          isAnimating = false
        }
      }
    }
    animate()
  }

  render(gl: any, matrix: any) {
    const { mbox, camera } = this,
      {
        _fov,
        width,
        height,
        _nearZ,
        _farZ,
        //@ts-ignore
      } = mbox.transform,
      halfFov = _fov / 2

    const halfHeight = Math.tan(halfFov) * _nearZ
    const halfWidth = (halfHeight * width) / height

    const { modelTransform } = this
    const m = new THREE.Matrix4().fromArray(matrix)
    const l = new THREE.Matrix4()
      .makeTranslation(
        modelTransform.translateX,
        modelTransform.translateY,
        modelTransform.translateZ,
      )
      .scale(
        new THREE.Vector3(
          modelTransform.scale,
          -modelTransform.scale,
          modelTransform.scale,
        ),
      )

    this.camera.projectionMatrix
      .makePerspective(
        -halfWidth,
        halfWidth,
        halfHeight,
        -halfHeight,
        _nearZ,
        _farZ,
      )
      .clone()
      .invert()
      .multiply(m)
      .multiply(l)
      .invert()
      .decompose(camera.position, camera.quaternion, camera.scale)

    const zoom = this.mbox.getZoom()
    const baseZoom = 18
    const zoomScale = Math.pow(2, baseZoom - zoom)
    uniforms.uScale.value = zoomScale
    const center = this.mbox.getCenter()
    const centerMercator = mapboxgl.MercatorCoordinate.fromLngLat(center, 0)

    const { scale, translateX, translateY } = this.modelTransform

    const curCenterThreePos = new THREE.Vector3(
      -(centerMercator.x - translateX) / scale,
      (centerMercator.y - translateY) / scale,
      0,
    )

    uniforms.uCenter.value.set(curCenterThreePos.x, curCenterThreePos.y, 0)

    const time = performance.now() * 0.002
    uniforms.uTime.value = time // 그리드용 시간 업데이트
    this.buildingManager.updateTime(time)

    this.labelManager.updatePositions(
      this.buildingManager.meshes,
      this.camera,
      width,
      height,
      uniforms.uScale.value,
    )

    this.renderer.resetState()
    this.renderer.render(this.scene, this.camera)
    this.mbox.triggerRepaint()
  }

  resizeWindow() {
    this.mbox.resize()
  }

  // ThreeLayer.ts 내부

  // 외부에서 접근 가능하도록 클래스에 메서드 추가
  public selectLandmark(index: number) {
    this.selectedIdx = index
    const info = landmarkInfos[index]
    const pos = uniforms.uLandmarks.value[index]

    // 매니저 상태 업데이트
    this.buildingManager.setHighlight(index)
    this.labelManager.updateSelection(index)

    // 애니메이션 유니폼 제어
    uniforms.uPrevActivePos.value.copy(uniforms.uActivePos.value)
    uniforms.uPrevActiveProgress.value = uniforms.uActiveProgress.value
    uniforms.uActivePos.value.copy(pos)
    uniforms.uActiveProgress.value = 0.0

    // this.mbox.flyTo({
    //   center: info.lnglat as LngLatLike,
    //   zoom: 11,
    //   pitch: 45,
    //   duration: 2000,
    // })

    isAnimating = true
    this.mbox.fire('landmarkSelected', { index })
  }

  public moveToLandmark(index: number) {
    const info = landmarkInfos[index]
    this.mbox.flyTo({
      center: info.lnglat as LngLatLike,
      zoom: 11,
      pitch: 45,
      duration: 2000,
    })
  }
}
