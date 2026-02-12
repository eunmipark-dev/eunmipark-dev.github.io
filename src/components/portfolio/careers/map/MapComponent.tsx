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

  const [barWidths, setBarWidths] = useState<number[]>([])

  useEffect(() => {
    if (activeLandmark?.skills) {
      // 1. 먼저 모든 바를 0으로 초기화
      setBarWidths(activeLandmark.skills.map(() => 0))

      // 2. 브라우저가 0%를 렌더링할 시간을 준 뒤, 목표 수치로 업데이트
      const timer = setTimeout(() => {
        setBarWidths(activeLandmark.skills!.map(s => s.level))
      }, 20) // 20ms 정도면 충분합니다.

      return () => clearTimeout(timer)
    }
  }, [activeIdx]) // 회사가 바뀔 때마다 실행

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

      {/* 통합 대시보드 패널 */}
      <div className="dashboard-bottom">
        <div className="dashboard-container">
          {/* 1. 커리어 노드 셀렉터 (왼쪽) */}
          <div className="dashboard-nav">
            <div className="dashboard-label">CAREER NODES</div>
            <div className="node-list">
              {landmarkInfos.map((info, index) => (
                <div
                  key={index}
                  className={`node-item ${activeIdx === index ? 'active' : ''}`}
                  onClick={() => goToLandmark(index)}
                >
                  <span className="node-index">0{index + 1}</span>
                  <span className="node-name">{info.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. 상세 업무 (중앙) */}
          <div className="dashboard-tasks">
  <div className="dashboard-label">ASSIGNED TASKS</div>
  {activeLandmark?.tasks ? (
    <div className="task-tree">
      {activeLandmark.tasks.map((task, i) => (
        <div key={i} className="task-group">
          <div className="task-parent">{task.title}</div>
          {task.subTasks && (
            <ul className="task-child-list">
              {task.subTasks.map((sub, j) => (
                <li key={j} className="task-child">{sub}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  ) : (
    <p className="placeholder">Select a node to see details</p>
  )}
</div>
          {/* 3. 스킬 그래프 (오른쪽) */}
          <div className="dashboard-skills">
            <div className="dashboard-label">TECHNICAL SKILLS</div>
            {activeLandmark?.skills ? (
              /* key={activeIdx} 를 주어 회사가 바뀔 때마다 애니메이션 재트리거 */
              <div className="skill-grid" key={activeIdx}>
                {activeLandmark.skills.map((skill, i) => (
                  <div key={i} className="skill-bar-unit">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-perc">{skill.level}%</span>
                    </div>
                    <div className="bar-bg">
                      <div
                        className="bar-fill"
                        style={{ width: `${barWidths[i] || 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="placeholder">No skill data available</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default MapComponent
