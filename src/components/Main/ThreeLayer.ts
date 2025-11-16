import { LngLat, Map, MercatorCoordinate, Point } from 'mapbox-gl'
import {
  AmbientLight,
  Camera,
  DirectionalLight,
  DirectionalLightHelper,
  MathUtils,
  Matrix4,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Vector3,
  WebGLRenderer,
  WebGLRenderTarget,
} from 'three'
//@ts-ignore
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

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
        const { x, y, z } = getPositionFromLongLat([127.0558, 37.5144])
        gltf.scene.position.set(x, y, z)
        this.scene.add(gltf.scene)
        console.log(gltf.scene)
        console.log('ff')
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

    this.mbox.on('zoom', this.onCameraChanged.bind(this))
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
      } = mbox.transform,
      halfFov = _fov / 2
    /* cameraToSeaLevelDistance = (_camera.position[2] * worldSize) / Math.cos(_pitch),
            horizonDistance = cameraToSeaLevelDistance / _horizonShift,
            undergroundDistance = (1000 * pixelsPerMeter) / Math.cos(_pitch),
            farZ = (camera.far = Math.max(
                horizonDistance,
                cameraToSeaLevelDistance + undergroundDistance,
            )),
            nearZ = (camera.near = height / 50),
            halfHeight = Math.tan(halfFov) * nearZ,
            halfWidth = (halfHeight * width) / height*/

    const groundAngle = Math.PI / 2 + _pitch
    const pitchAngle = Math.cos(Math.PI / 2 - _pitch)
    //const worldSize = tileSize * scale
    const fovAboveCenter = _fov * (0.5 + centerOffset.y / height)

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
    camera.projectionMatrix = m.multiply(l)
    /*camera.projectionMatrix
            .makePerspective(-halfWidth, halfWidth, halfHeight, -halfHeight, nearZ, farZ)
            .clone()
            .invert()
            .multiply(m)
            .multiply(l)
            .invert()
            .decompose(camera.position, camera.quaternion, camera.scale)*/

    //console.log(camera.position)

    const rad = MathUtils.degToRad(mbox.getBearing() + 30)

    light.position.set(-Math.sin(rad), -Math.cos(rad), SQRT3).normalize()

    this.renderer.resetState()
    //this.renderHUD()
    this.renderer.render(this.scene, this.camera)
    this.mbox.triggerRepaint()
    // console.log('reemmememem')
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
