import React, { useEffect, useRef } from 'react'
import MapManager from './MapManager' // Map.ts에서 가져온 클래스/함수 가정
import './map.scss' // 지도 스타일
import styled from '@emotion/styled'

const MapContainer = styled.div<{ width?: string; height?: string }>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
`

const MapComponent: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null) // Mapbox 인스턴스 저장용

  useEffect(() => {
    if (!mapContainer.current) return

    // 1. 지도 인스턴스가 없을 때만 초기화 (중복 생성 방지)
    if (!mapInstance.current) {
      mapInstance.current = MapManager.makeInstance(mapContainer.current)
    }

    // 2. 컴포넌트 언마운트 시 메모리 누수 방지를 위한 cleanup
    return () => {
      if (mapInstance.current) {
        // Map.ts에 destroy나 remove 메서드가 있다면 호출
        mapInstance.current.remove()
        mapInstance.current = null
      }
    }
  }, [])

  return (
    <MapContainer ref={mapContainer} width="100%" height="400px" id="my_map" />
  )
}

export default MapComponent
