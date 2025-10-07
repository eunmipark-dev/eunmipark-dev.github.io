import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import maplibregl, { Map } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

interface MapComponentProps {
  center: [number, number] // [경도, 위도]
  zoom: number
  styleUrl: string
  width?: string
  height?: string
}

const MapContainer = styled.div<{ width?: string; height?: string }>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100vh'};
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

  useEffect(() => {
    if (!mapContainer.current) return // 컨테이너가 없으면 초기화 방지
    if (map.current) return // 지도가 이미 초기화된 경우 중복 방지

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: styleUrl,
      center,
      zoom,
    })

    // 컴포넌트 언마운트 시 지도 제거
    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null // 참조 정리
      }
    }
  }, [center, zoom, styleUrl]) // 의존성 배열: center, zoom, styleUrl 변경 시 재실행

  return <MapContainer ref={mapContainer} width={width} height={height} />
}

export default MapComponent
