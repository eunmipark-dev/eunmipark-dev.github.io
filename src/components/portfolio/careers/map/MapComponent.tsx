import React, { useEffect, useRef, useState } from 'react'
import MapManager from './MapManager' // Map.ts에서 가져온 클래스/함수 가정
import './map.scss' // 지도 스타일
import styled from '@emotion/styled'

const landmarkList = [
  { title: 'SIN I&C', desc: 'Smart City Solution' },
  { title: 'CEST', desc: 'Embedded Research' },
  { title: 'MORAI', desc: 'Autonomous Platform' },
]

const MapContainer = styled.div<{ width?: string; height?: string }>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
`

const MapComponent: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<MapManager>(null) // Mapbox 인스턴스 저장용
  const [activeIdx, setActiveIdx] = useState<number | null>(0)

  const goToLandmark = (index: number) => {
    setActiveIdx(index)
    // TODO: MapManager.getInstance().flyMap(...) 등을 호출하여 지도 이동 연동
    console.log(`Moving to landmark: ${landmarkList[index].title}`)
  }

  useEffect(() => {
    if (!mapContainer.current) return

    // 1. 지도 인스턴스가 없을 때만 초기화 (중복 생성 방지)
    if (!mapInstance.current) {
      mapInstance.current = MapManager.makeInstance(mapContainer.current)

      mapInstance.current.map.on('landmarkSelected', (data: any) => {
        setActiveIdx(data.index)
      })
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
    <>
      <MapContainer ref={mapContainer} id="my_map" />
      <div className="landmark-nav">
        <div className="nav-header">
          <div className="hex-icon"></div>
          CAREER NODES
        </div>

        <div className="nav-list">
          {landmarkList.map((info, index) => (
            <div
              key={index}
              className={`nav-item ${activeIdx === index ? 'active' : ''}`}
              onClick={() => goToLandmark(index)}
            >
              <div className="hex-bg"></div>
              <span className="item-index">0{index + 1}</span>
              <div className="item-text">
                <div className="item-title">{info.title}</div>
              </div>
              <div className="item-status"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default MapComponent
