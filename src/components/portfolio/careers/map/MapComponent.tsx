import React, { useEffect, useRef, useState } from 'react'
import MapManager from './MapManager' // Map.ts에서 가져온 클래스/함수 가정
import './map.scss' // 지도 스타일
import styled from '@emotion/styled'
import { landmarkInfos } from './data'

const MapContainer = styled.div<{ width?: string; height?: string }>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
`

const MapComponent: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<MapManager>(null) // Mapbox 인스턴스 저장용
  const [activeIdx, setActiveIdx] = useState<number | null>(2)
  const activeLandmark = activeIdx !== null ? landmarkInfos[activeIdx] : null

  const goToLandmark = (index: number) => {
    setActiveIdx(index)
    mapInstance.current?.threeLayer.selectLandmark(index)
    mapInstance.current?.threeLayer.moveToLandmark(index)
    // TODO: MapManager.getInstance().flyMap(...) 등을 호출하여 지도 이동 연동
    console.log(`Moving to landmark: ${landmarkInfos[index].name}`)
  }

  useEffect(() => {
    if (!mapContainer.current) return

    // 1. 지도 인스턴스가 없을 때만 초기화 (중복 생성 방지)
    if (!mapInstance.current) {
      mapInstance.current = MapManager.makeInstance(mapContainer.current)

      mapInstance.current.map.on('landmarkSelected', (data: any) => {
        setActiveIdx(data.index)
      })

      mapInstance.current.map.once('threeLayerCreated', () => {
        console.log('ThreeLayer ready - executing initial landmark selection')

        // 약간의 딜레이(예: 500ms)를 주어 애니메이션이 더 자연스럽게 시작되도록 할 수 있습니다.
        setTimeout(() => {
          goToLandmark(2)
        }, 1000)
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
        <div className="nav-header">CAREER NODES</div>

        {/* 좌측 하단 랜드마크 리스트 */}
        <div className="nav-list">
          <div className="landmark-nav-inner">
            {landmarkInfos.map((info, index) => (
              <div
                key={index}
                className={`nav-item ${activeIdx === index ? 'active' : ''}`}
                onClick={() => goToLandmark(index)}
              >
                <div className="hex-bg"></div>
                <span className="item-index">0{index + 1}</span>
                <div className="item-text">
                  <div className="item-title">{info.name}</div>
                </div>
                <div className="item-status"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 상세 정보 패널 */}
      {activeLandmark && (
        <div className="bottom-info-panel">
          <div className="panel-inner">
            {/* 왼쪽: 업무 영역 */}
            <div className="section-tasks">
              <div className="section-label">ASSIGNED TASKS</div>
              <ul className="task-list">
                {activeLandmark.tasks?.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
            </div>

            {/* 중간 구분선 (디자인 요소) */}
            <div className="divider"></div>

            {/* 오른쪽: 스킬 영역 */}
            <div className="section-skills">
              <div className="section-label">TECHNICAL SKILLS</div>
              <div className="skill-grid">
                {activeLandmark.skills?.map((skill, i) => (
                  <div key={i} className="skill-item">
                    <div className="skill-text">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="progress-bg">
                      <div
                        className="progress-fill"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MapComponent
