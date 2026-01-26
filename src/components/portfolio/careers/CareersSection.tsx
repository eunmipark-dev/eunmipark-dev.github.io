import React, { useState } from 'react'
import Section from '../section/Section'
import { css } from '@emotion/react'
import MapComponent from './map/MapComponent'
import './careers.scss'
//import MapComponent2 from '@components/main/MapComponent2'

const landmarkList = [
  { title: 'SIN I&C', desc: 'Smart City Solution' },
  { title: 'CEST', desc: 'Embedded Research' },
  { title: 'MORAI', desc: 'Autonomous Platform' },
]

const CareersSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(0)

  const goToLandmark = (index: number) => {
    setActiveIdx(index)
    // TODO: MapManager.getInstance().flyMap(...) 등을 호출하여 지도 이동 연동
    console.log(`Moving to landmark: ${landmarkList[index].title}`)
  }

  return (
    <div className="careers-container">
      <div className="careers-content">
        <div className="map-frame">
          {/* 실제 지도 컴포넌트 */}
          <MapComponent />

          {/* 지도를 배경에 녹여내는 그라데이션 레이어 */}
          <div className="map-vignette"></div>

          {/* <div className="landmark-nav">
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
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default CareersSection
