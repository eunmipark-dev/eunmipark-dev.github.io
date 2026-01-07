import { LngLat, Map, MercatorCoordinate, Point } from 'mapbox-gl'
import {
  AdditiveBlending,
  AmbientLight,
  ArrowHelper,
  AxesHelper,
  Camera,
  CameraHelper,
  DirectionalLight,
  DirectionalLightHelper,
  FrontSide,
  MathUtils,
  Matrix4,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Raycaster,
  Scene,
  ShaderMaterial,
  TorusGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
  WebGLRenderTarget,
  Color,
} from 'three'
//@ts-ignore
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import * as dat from 'dat.gui'

interface layerProps {
  map: Map
  modelOrigin: MercatorCoordinate
}

// 3d layer
interface CetnerTransform {
  translateX: number
  translateY: number
  translateZ: number
  rotateX: number
  rotateY: number
  rotateZ: number
  scale: number
}

const centerLngLat: LngLat = new LngLat(128.41451, 35.64276)
const scale: number = 5.4184e-8
const deviceCount: number = 1000

const SQRT3 = Math.sqrt(3)

// add object
let material = new MeshPhongMaterial({ color: 0x00ff00 })
let torusGeometry = new TorusGeometry(5, 1.5, 16, 100)
let torusObject = new Mesh(torusGeometry, material)

// **Glow Shader Material**
let glowMaterial = new ShaderMaterial({
  uniforms: {
    //viewVector: { value: this.camera.position },
    u_time: { value: 0.0 },
  },
  vertexShader: vertexShader(),
  fragmentShader: fragmentShader(),
  side: FrontSide,
  blending: AdditiveBlending,
  transparent: true,
})
function vertexShader() {
  return `
                    varying float intensity;
                    
                    void main() {
                        vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
                        gl_Position = projectionMatrix * modelViewPosition;

                        vec3 vNormal = normalize( normalMatrix * normal ); // 정점 법선벡터
                        vec3 vNormel = normalize( vec3( modelViewMatrix * vec4( position, 1.0 ) ) ); // 정점 위치벡터 (모델 중심에서 나가는 방향향)
                        intensity = pow(( 1.0 - dot( vNormal, vNormel ) ) * 0.5, 5.0);
                    }`
}
function fragmentShader() {
  return `
                    varying float intensity;
                    uniform float u_time; // 시간을 위한 유니폼
                    

                    void main() {
                         //vec3 glowColor = vec3(0.3, 1.0, 0.3); // 형광 녹색
                        //float pulse = 0.5 * sin(u_time * 2.0) + 0.5;
                        float pulse = 0.25 * sin(u_time * 2.0) + 0.75;
                         float r = 0.5 + 0.5 * sin(u_time * 2.0);
                        float g = 0.5 + 0.5 * sin(u_time * 2.5 + 1.0);
                        float b = 0.5 + 0.5 * sin(u_time * 3.0 + 2.0);

                        vec3 glowColor = vec3(r, g, b); // RGB 값이 시간에 따라 변화
                        gl_FragColor = vec4(glowColor, intensity * pulse); // intensity 값에 따라 밝기 조절
                    }`
}

export default class {
  id = 'traffic-layer'
  type = 'custom'
  renderingMode: string = '3d'

  scene: Scene = new Scene()
  camera: PerspectiveCamera = new PerspectiveCamera()

  renderer!: WebGLRenderer
  raycaster: Raycaster = new Raycaster()
  mbox!: Map

  cetnerTransform: CetnerTransform

  light: DirectionalLight = new DirectionalLight(0xffffff)
  ambientLight: AmbientLight = new AmbientLight(0xffffff, 0.3)

  modelOrigin?: MercatorCoordinate

  canvas: HTMLCanvasElement
  canvasLabel: HTMLCanvasElement

  rayHelper?: ArrowHelper

  selectedObject: Mesh | null = null

  constructor(props: layerProps) {
    const { map, modelOrigin } = props

    const centerAltitude = 0
    const centerRotate = new Vector3(Math.PI / 2, 0, 0)
    const lngLat = MercatorCoordinate.fromLngLat(centerLngLat, centerAltitude)
    this.cetnerTransform = {
      translateX: lngLat.x,
      translateY: lngLat.y,
      translateZ: lngLat.z ? lngLat.z : 0,
      rotateX: centerRotate.x,
      rotateY: centerRotate.y,
      rotateZ: centerRotate.z,
      scale: scale,
    }

    this.raycaster.near = -1
    this.raycaster.far = 1e6

    this.canvas = map.getCanvas()
    this.canvasLabel = document.createElement('canvas')

    this.canvasLabel.id = 'myCanvasId'

    map.getCanvasContainer().appendChild(this.canvasLabel)

    this.canvasLabel.width = this.canvas.width
    this.canvasLabel.height = this.canvas.height
    window.addEventListener('resize', this.resizeWindow.bind(this), false)

    this.mbox = map
    this.modelOrigin = modelOrigin
  }

  onAdd(map: Map, gl: any) {
    const zoom = map.getZoom()
    const cameraZ = map?.getFreeCameraOptions()?.position?.z ?? 0

    this.scene.add(this.light)

    const helper = new DirectionalLightHelper(this.light, 5)
    this.scene.add(helper)
    this.scene.add(this.ambientLight)

    const loader = new GLTFLoader()
    loader.load(
      'https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf',
      (gltf: any) => {
        //const { x, y, z } = getPositionFromLongLat([127.0558, 37.5144])
        const { x, y, z } = getPositionFromLongLat([128.41451, 35.64276])
        gltf.scene.position.set(x, y, z)
        //        this.scene.add(gltf.scene)
      },
    )

    const { _fov, width, height } = map.transform

    this.camera = new PerspectiveCamera(
      MathUtils.radToDeg(_fov),
      width / height,
    )

    this.renderer = new WebGLRenderer({
      canvas: map.getCanvas(),
      context: gl,
      antialias: true,
    })

    this.renderer.autoClear = false

    const gui = new dat.GUI()
    const cameraFolder = gui.addFolder('Three.js Camera')

    cameraFolder.add(this.camera.position, 'x', -10, 10).listen() // 실시간 listen으로 업데이트
    cameraFolder.add(this.camera.position, 'y', -10, 10).listen()
    cameraFolder.add(this.camera.position, 'z', -10, 10).listen()
    cameraFolder.open()

    gui.domElement.style.position = 'absolute'
    gui.domElement.style.top = '10px'
    gui.domElement.style.right = '10px'

    const { x, y, z } = getPositionFromLongLat([128.41451, 35.64376])
    torusObject.position.set(x, y, z)

    // **Glow Mesh (약간 더 큰 토러스)**
    let torusGlowGeometry = new TorusGeometry(5, 2.5, 16, 100)
    let torusGlowMesh = new Mesh(torusGlowGeometry, glowMaterial)
    torusObject.add(torusGlowMesh)
    torusObject.userData.name = 'test-object'
    //torusObject.glow = torusGlowMesh;

    this.scene.add(torusObject)

    // ./add object

    // add camera helper
    // 축 헬퍼: 세계 좌표계 확인 (크기 1000은 테스트값, scale에 맞춰 조정)
    //const axesHelper = new AxesHelper(1000) // 빨강(X), 초록(Y), 파랑(Z)
    //this.scene.add(axesHelper)

    // 카메라 헬퍼: 카메라의 프러스텀(시야 범위) 시각화
    //const cameraHelper = new CameraHelper(this.camera)
    //this.scene.add(cameraHelper)
    // ./add camera helper

    this.mbox.on('zoom', this.onCameraChanged.bind(this))

    // raycast on hover (with throttle)
    const mouse = new Vector2()

    // 간단한 throttle 함수 (lodash 대신 vanilla JS)
    const throttle = (func: Function, delay: number) => {
      let lastCall = 0
      return (...args: any[]) => {
        const now = new Date().getTime()
        if (now - lastCall < delay) return
        lastCall = now
        return func(...args)
      }
    }

    const checkObjects = throttle((e: any) => {
      mouse.x = (e.point.x / this.mbox.transform.width) * 2 - 1
      mouse.y = 1 - (e.point.y / this.mbox.transform.height) * 2

      // Set raycaster from camera
      this.raycaster.setFromCamera(mouse, this.camera)

      // Intersect with scene objects (recursive: true to check children)
      const intersects = this.raycaster.intersectObjects(
        this.scene.children,
        true,
      )

      // Filter intersects to only include objects with userData.name === 'test-object'
      const filteredIntersects = intersects.filter(
        intersect => intersect.object.userData.name === 'test-object',
      )

      let needsRepaint = false

      if (filteredIntersects.length > 0) {
        const intersect = filteredIntersects[0]
        const object = intersect.object as Mesh // Assuming it's a Mesh

        if (object !== this.selectedObject) {
          // Restore previous object's color if exists
          if (this.selectedObject) {
            const prevMaterial = this.selectedObject
              .material as MeshPhongMaterial
            if (this.selectedObject.userData.originalColor) {
              prevMaterial.color.copy(
                this.selectedObject.userData.originalColor,
              )
            }
            needsRepaint = true
          }

          // Save original color if not already saved
          const currentMaterial = object.material as MeshPhongMaterial
          if (!object.userData.originalColor) {
            object.userData.originalColor = currentMaterial.color.clone()
          }

          // Change color to highlight (e.g., red)
          currentMaterial.color.set(0xff0000)
          this.selectedObject = object
          needsRepaint = true
        }
      } else {
        // No intersect: Restore previous object's color
        if (this.selectedObject) {
          const prevMaterial = this.selectedObject.material as MeshPhongMaterial
          if (this.selectedObject.userData.originalColor) {
            prevMaterial.color.copy(this.selectedObject.userData.originalColor)
          }
          this.selectedObject = null
          needsRepaint = true
        }
      }

      // Optimized repaint: Only trigger if color changed
      if (needsRepaint) {
        this.mbox.triggerRepaint()
      }
    }, 100) // 100ms throttle (부하에 따라 200~500ms로 늘려봐)

    this.mbox.on('mousemove', checkObjects)

    // 마우스 아웃 시 helper 제거 (옵션)
    this.mbox.on('mouseout', () => {
      if (this.rayHelper) {
        this.scene.remove(this.rayHelper)
        this.rayHelper = undefined
      }
    })
  }

  onCameraChanged() {
    // const me = this,
    //     map = me.map,
    //     cameraParams = {
    //         zoom: me.mbox.getZoom(),
    //         cameraZ: me.mbox?.getFreeCameraOptions()?.position?.z ?? 1.0,
    //     }
    // me.busMeshSet.refreshCameraParams(cameraParams)
  }

  render(gl: any, matrix: any) {
    const { modelOrigin, mbox, renderer, camera, light, scene } = this,
      {
        _fov,
        _camera,
        _horizonShift,
        pixelsPerMeter,
        worldSize,
        _pitch,
        width,
        height,
        centerOffset,
        tileSize,
        scale,
        elevation,
        _nearZ,
        _farZ,
      } = mbox.transform,
      halfFov = _fov / 2

    const groundAngle = Math.PI / 2 + _pitch

    const pitchAngle = Math.cos(Math.PI / 2 - _pitch)

    const fovAboveCenter = _fov * (0.5 + centerOffset.y / height)

    glowMaterial.uniforms.u_time.value += 0.02

    // Adjust distance to MSL by the minimum possible elevation visible on screen,
    // this way the far plane is pushed further in the case of negative elevation.
    const minElevationInPixels = elevation
      ? elevation.getMinElevationBelowMSL() * pixelsPerMeter
      : 0
    const cameraToSeaLevelDistance =
      (_camera.position[2] * worldSize - minElevationInPixels) /
      Math.cos(_pitch)

    const topHalfSurfaceDistance =
      (Math.sin(fovAboveCenter) * cameraToSeaLevelDistance) /
      Math.sin(
        clamp(Math.PI - groundAngle - fovAboveCenter, 0.01, Math.PI - 0.01),
      )

    // Calculate z distance of the farthest fragment that should be rendered.
    const furthestDistance =
      pitchAngle * topHalfSurfaceDistance + cameraToSeaLevelDistance

    // Add a bit extra to avoid precision problems when a fragment's distance is exactly `furthestDistance`
    const horizonDistance = cameraToSeaLevelDistance * (1 / _horizonShift)
    const farZ = Math.min(furthestDistance * 1.01, horizonDistance)

    const nearZ = (camera.near = height / 50)

    const halfHeight = Math.tan(halfFov) * nearZ
    const halfWidth = (halfHeight * width) / height

    const { cetnerTransform } = this

    const m = new Matrix4().fromArray(matrix)
    const l = new Matrix4()
      .makeTranslation(
        cetnerTransform.translateX,
        cetnerTransform.translateY,
        0,
      )
      .scale(
        /*new Vector3(
                    this.cetnerTransform.scale,
                    -this.cetnerTransform.scale,
                    this.cetnerTransform.scale,
                ),*/
        new Vector3(
          this.cetnerTransform.scale,
          -this.cetnerTransform.scale,
          this.cetnerTransform.scale,
        ),
      )
    //ok
    //camera.projectionMatrix = m.multiply(l)
    camera.projectionMatrix
      .makePerspective(
        -halfWidth,
        halfWidth,
        halfHeight,
        -halfHeight,
        //_nearZ,
        //_farZ,
        nearZ,
        farZ,
      )
      .clone()
      .invert()
      .multiply(m)
      .multiply(l)
      .invert()
      .decompose(camera.position, camera.quaternion, camera.scale)

    const rad = MathUtils.degToRad(mbox.getBearing() + 30)

    light.position.set(-Math.sin(rad), -Math.cos(rad), SQRT3).normalize()

    this.renderer.resetState()
    //this.renderHUD()
    this.renderer.render(this.scene, this.camera)
    this.mbox.triggerRepaint()

    //console.log(torusObject.position.toArray())
  }

  pickObject_(p: Point) {}

  worldToScreen(vec3_: Vector3) {
    const pos = new Vector3(vec3_.x, vec3_.y, vec3_.z)
    pos.project(this.camera)

    pos.x = (pos.x * this.canvas.width) / 2 + this.canvas.width / 2
    pos.y = -((pos.y * this.canvas.height) / 2) + this.canvas.height / 2
    pos.z = 0

    return { x: pos.x, y: pos.y }
  }

  resizeWindow() {
    this.canvasLabel.width = this.mbox.getCanvas().width
    this.canvasLabel.height = this.mbox.getCanvas().height

    this.mbox.resize()
  }
}

function clamp(n: any, min: any, max: any) {
  return Math.min(max, Math.max(min, n))
}

export function getPositionFromLongLat(objectPos: [number, number]) {
  const centerCoords = MercatorCoordinate.fromLngLat(centerLngLat, 0)
  const objectCoords = MercatorCoordinate.fromLngLat(objectPos, 0)

  let dx = objectCoords.x - centerCoords.x
  let dy = -(objectCoords.y - centerCoords.y)
  let dz = objectCoords.z - centerCoords.z

  dx /= scale
  dy /= scale
  dz /= scale

  return new Vector3(dx, dy, dz)
}
