import mapboxgl, {
  MercatorCoordinate,
  type AnyLayer,
  type LngLatLike,
} from 'mapbox-gl'
import configs from './configs'
import ThreeLayer from './ThreeLayer'

//@ts-ignore
const modelOrigin = MercatorCoordinate.fromLngLat(configs.defaultCenter)
const modelScale = modelOrigin.meterInMercatorCoordinateUnits()

mapboxgl.accessToken =
  'pk.eyJ1IjoiZXVubWlwYXJrIiwiYSI6ImNsYmw0NnBiOTAzdGgzcnA0Y296aWo0ZHAifQ.Cm39i0B8ZTNC4GP3DkIkRw'

export default class MapManager {
  private static instance: MapManager
  // 상속 대신 map 객체를 직접 들고 있음
  public map: mapboxgl.Map
  public container: HTMLElement
  public scale: number
  public threeLayer!: ThreeLayer

  // 생성자에서 container를 직접 받도록 수정
  private constructor(container: HTMLElement) {
    this.container = container

    this.map = new mapboxgl.Map({
      container: this.container,
      center: configs.defaultCenter as LngLatLike,
      zoom: configs.defaultZoom,
      bearing: configs.defaultBearing,
      pitch: configs.defaultPitch,
      style:
        'https://api.maptiler.com/maps/019be442-2479-7fd3-92e3-e9ae2b792de3/style.json?key=mrPdcdnzsGnDw03vlqEH',
    })

    const modelAsMercatorCoordinate = MercatorCoordinate.fromLngLat(
      configs.defaultCenter as LngLatLike,
      0,
    )
    this.scale = modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()

    this.map.once('load', async () => {
      const threeLayer = new ThreeLayer({
        mapManager: this, // this 대신 this.map 전달
        modelOrigin: configs.defaultCenter as LngLatLike,
      })
      this.threeLayer = threeLayer
      this.map.addLayer(threeLayer as AnyLayer)

      this.map.fire('threeLayerCreated', {
        index: 1,
        name: 'threeLayer',
      })
    })
  }

  // 인스턴스 생성 시 엘리먼트를 넘겨주도록 변경
  public static makeInstance(container: HTMLElement): MapManager {
    if (!MapManager.instance) {
      MapManager.instance = new MapManager(container)
    }
    return MapManager.instance
  }

  public static getInstance(): MapManager {
    return MapManager.instance
  }

  // 필요한 mapboxgl.Map 메서드들은 대리(Proxy) 호출 형태로 구현
  public remove() {
    this.map.remove()
  }

  getModelPosition(lnglat: mapboxgl.LngLatLike, altitude: number) {
    const coord = MercatorCoordinate.fromLngLat(lnglat, altitude)

    let x = coord.x - modelOrigin.x
    let y = -(coord.y - modelOrigin.y)
    let z = 0

    x /= this.scale
    y /= this.scale
    z /= this.scale

    return {
      x: x,
      y: y,
      z: z,
    }
  }
}
