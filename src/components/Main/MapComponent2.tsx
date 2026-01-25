import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import mapboxgl, { Map, MercatorCoordinate } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl' // Mapbox CSS 임포트 (필요 시 주석 해제)
import * as THREE from 'three'
//import 'mapbox-gl/dist/mapbox-gl.css' // 이 줄을 추가 (주석 해제하거나 새로 넣음)
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import ThreeLayer from './ThreeLayer'
import { AnyLayer } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

interface MapComponentProps {
  center: [number, number] // [경도, 위도]
  zoom: number
  styleUrl: string
  accessToken: string // Mapbox 액세스 토큰 추가 (필수)
  width?: string
  height?: string
}

const MapContainer = styled.div<{ width?: string; height?: string }>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
`

const MapComponent2: React.FC<MapComponentProps> = ({
  center,
  zoom,
  styleUrl,
  accessToken,
  width,
  height,
}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const threeRenderer = useRef<THREE.WebGLRenderer | null>(null)
  const threeCamera = useRef<THREE.Camera | null>(null)
  const threeScene = useRef<THREE.Scene | null>(null)
  const threeLayer = useRef<ThreeLayer | null>(null)

  useEffect(() => {
    if (!mapContainer.current) return // 컨테이너가 없으면 초기화 방지
    if (map.current) return // 지도가 이미 초기화된 경우 중복 방지

    // Mapbox 액세스 토큰 설정 (전역으로 설정 가능하지만, 여기서는 생성자에 전달)
    //mapboxgl.accessToken = accessToken

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: styleUrl,
      center,
      zoom,
      accessToken:
        'pk.eyJ1IjoiZXVubWlwYXJrIiwiYSI6ImNsYmw0NnBiOTAzdGgzcnA0Y296aWo0ZHAifQ.Cm39i0B8ZTNC4GP3DkIkRw',
    })

    //    map.current.on('style.load', initThreeJsLayer)
    map.current.once('load', async () => {
      if (map.current) {
        threeLayer.current = new ThreeLayer({
          map: map.current,
          modelOrigin: MercatorCoordinate.fromLngLat(
            center as mapboxgl.LngLatLike,
          ),
        })
        map.current.addLayer(threeLayer.current as AnyLayer)

        // map.current.addSource('national-park', {
        //   type: 'geojson',
        //   data: {
        //     type: 'FeatureCollection',
        //     features: [
        //       {
        //         type: 'Feature',
        //         geometry: {
        //           type: 'Point',
        //           coordinates: [127.0558, 37.5144],
        //         },
        //       },
        //       {
        //         type: 'Feature',
        //         geometry: {
        //           type: 'Point',
        //           coordinates: [127.0558, 37.5145],
        //         },
        //       },
        //     ],
        //   },
        // })

        // map.current.addLayer({
        //   id: 'park-boundary',
        //   type: 'fill',
        //   source: 'national-park',
        //   paint: {
        //     'fill-color': '#888888',
        //     'fill-opacity': 0.4,
        //   },
        //   filter: ['==', '$type', 'Polygon'],
        // })

        // map.current.addLayer({
        //   id: 'park-volcanoes',
        //   type: 'circle',
        //   source: 'national-park',
        //   paint: {
        //     'circle-radius': 6,
        //     'circle-color': '#B42222',
        //   },
        //   filter: ['==', '$type', 'Point'],
        // })
      }
    })

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
      if (threeRenderer.current) {
        threeRenderer.current.dispose()
      }
    }
  }, [center, zoom, styleUrl, accessToken]) // 의존성 배열에 accessToken 추가

  return <MapContainer ref={mapContainer} width={width} height={height} />
}

export default MapComponent2
