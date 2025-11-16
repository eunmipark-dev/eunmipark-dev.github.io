// import React, { useEffect, useRef } from 'react'
// import styled from '@emotion/styled'
// import maplibregl, { Map } from 'maplibre-gl'
// //import 'maplibre-gl/dist/maplibre-gl.css'

// interface MapComponentProps {
//   center: [number, number] // [경도, 위도]
//   zoom: number
//   styleUrl: string
//   width?: string
//   height?: string
// }

// const MapContainer = styled.div<{ width?: string; height?: string }>`
//   width: ${({ width }) => width || '100%'};
//   height: ${({ height }) => height || '100%'};
// `

// const MapComponent: React.FC<MapComponentProps> = ({
//   center,
//   zoom,
//   styleUrl,
//   width,
//   height,
// }) => {
//   const mapContainer = useRef<HTMLDivElement | null>(null)
//   const map = useRef<maplibregl.Map | null>(null)

//   useEffect(() => {
//     if (!mapContainer.current) return // 컨테이너가 없으면 초기화 방지
//     if (map.current) return // 지도가 이미 초기화된 경우 중복 방지

//     map.current = new maplibregl.Map({
//       container: mapContainer.current,
//       style: styleUrl,
//       center,
//       zoom,
//     })

//     // 컴포넌트 언마운트 시 지도 제거
//     return () => {
//       if (map.current) {
//         map.current.remove()
//         map.current = null // 참조 정리
//       }
//     }
//   }, [center, zoom, styleUrl]) // 의존성 배열: center, zoom, styleUrl 변경 시 재실행

//   return <MapContainer ref={mapContainer} width={width} height={height} />
// }

// export default MapComponent

import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import maplibregl, { Map } from 'maplibre-gl'
//import 'maplibre-gl/dist/maplibre-gl.css';
import * as THREE from 'three'

interface MapComponentProps {
  center: [number, number] // [경도, 위도]
  zoom: number
  styleUrl: string
  width?: string
  height?: string
}

const MapContainer = styled.div<{ width?: string; height?: string }>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
`

const MapComponent: React.FC<MapComponentProps> = ({
  center,
  zoom,
  styleUrl,
  width,
  height,
}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const threeRenderer = useRef<THREE.WebGLRenderer | null>(null)
  const threeCamera = useRef<THREE.Camera | null>(null)
  const threeScene = useRef<THREE.Scene | null>(null)

  useEffect(() => {
    if (!mapContainer.current) return // 컨테이너가 없으면 초기화 방지
    if (map.current) return // 지도가 이미 초기화된 경우 중복 방지

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: styleUrl,
      center,
      zoom,
    })

    // Three.js 초기화 및 커스텀 레이어 추가
    const initThreeJsLayer = () => {
      const modelOrigin1: [number, number] = [127.0558, 37.5144] // 첫 번째 주소 좌표
      const modelOrigin2: [number, number] = [127.0416, 37.503] // 두 번째 주소 좌표
      const modelAltitude = 0 // 지상 높이 (조정 가능)
      const modelScale = 50 // 마커 크기 스케일 (조정 가능)

      // Three.js 씬 설정
      threeScene.current = new THREE.Scene()
      threeCamera.current = new THREE.Camera()
      threeRenderer.current = new THREE.WebGLRenderer({
        canvas: map.current!.getCanvas(),
        context: map
          .current!.getCanvas()
          .getContext('webgl2') as WebGLRenderingContext,
        antialias: true,
      })
      threeRenderer.current.autoClear = false

      // 조명 추가
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
      threeScene.current.add(ambientLight)
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
      directionalLight.position.set(1, 1, 1)
      threeScene.current.add(directionalLight)

      // 첫 번째 3D 마커 (큐브)
      const geometry1 = new THREE.BoxGeometry(1, 1, 1)
      const material1 = new THREE.MeshStandardMaterial({ color: 0xff0000 }) // 빨간색 큐브
      const cube1 = new THREE.Mesh(geometry1, material1)
      threeScene.current.add(cube1)

      // 두 번째 3D 마커 (큐브)
      const geometry2 = new THREE.BoxGeometry(1, 1, 1)
      const material2 = new THREE.MeshStandardMaterial({ color: 0x00ff00 }) // 초록색 큐브
      const cube2 = new THREE.Mesh(geometry2, material2)
      threeScene.current.add(cube2)

      // MapLibre의 mercator 좌표로 변환하는 함수
      const lngLatToMercator = (lngLat: [number, number]) => {
        const mercator = maplibregl.MercatorCoordinate.fromLngLat(
          lngLat,
          modelAltitude,
        )
        return [mercator.x, mercator.y, mercator.z || 0]
      }

      const modelTransform = {
        translateX: 0,
        translateY: 0,
        translateZ: 0,
        rotateX: Math.PI / 2,
        rotateY: 0,
        rotateZ: 0,
        scale: 0,
      }

      // 커스텀 레이어 정의
      const customLayer: maplibregl.CustomLayerInterface = {
        id: '3d-markers',
        type: 'custom',
        renderingMode: '3d',
        onAdd: function (map: Map, gl: WebGLRenderingContext) {
          // Three.js 렌더러 설정
          threeRenderer.current!.setSize(
            map.getCanvas().clientWidth,
            map.getCanvas().clientHeight,
          )
        },
        render: function (gl: WebGLRenderingContext, matrix: number[]) {
          if (
            !threeRenderer.current ||
            !threeScene.current ||
            !threeCamera.current
          )
            return

          // 지도 매트릭스 업데이트
          const lglMatrix = new THREE.Matrix4().fromArray(matrix)
          threeCamera.current.projectionMatrix = lglMatrix

          // 마커 위치 업데이트 (mercator 변환)
          const [x1, y1, z1] = lngLatToMercator(modelOrigin1)
          modelTransform.translateX = x1
          modelTransform.translateY = y1
          modelTransform.translateZ = z1
          modelTransform.scale =
            modelScale * Math.pow(2, map.current?.getZoom() ?? 10 - 1) // 줌에 따라 스케일 조정

          // 첫 번째 큐브 변환 적용
          cube1.position.set(
            modelTransform.translateX,
            modelTransform.translateY,
            modelTransform.translateZ,
          )
          cube1.scale.set(
            modelTransform.scale,
            modelTransform.scale,
            modelTransform.scale,
          )
          cube1.rotation.set(
            modelTransform.rotateX,
            modelTransform.rotateY,
            modelTransform.rotateZ,
          )

          // 두 번째 큐브 변환 적용 (동일한 transform 사용, 위치만 다름)
          const [x2, y2, z2] = lngLatToMercator(modelOrigin2)
          cube2.position.set(x2, y2, z2)
          cube2.scale.set(
            modelTransform.scale,
            modelTransform.scale,
            modelTransform.scale,
          )
          cube2.rotation.set(
            modelTransform.rotateX,
            modelTransform.rotateY,
            modelTransform.rotateZ,
          )

          // 렌더링
          threeRenderer.current.state.reset()
          threeRenderer.current.render(threeScene.current, threeCamera.current)
          map.current?.triggerRepaint()
        },
      }

      map.current?.addLayer(customLayer)
    }

    map.current.on('style.load', initThreeJsLayer)

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
  }, [center, zoom, styleUrl]) // 의존성 배열: center, zoom, styleUrl 변경 시 재실행

  return <MapContainer ref={mapContainer} width={width} height={height} />
}

export default MapComponent
