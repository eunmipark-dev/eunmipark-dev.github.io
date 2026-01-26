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
  return (
    <Section title="Careers">
      <div className="careers-container">
        <div className="map-frame">
          {/* 실제 지도 컴포넌트 */}
          <div className="map-frame-inner">
            <MapComponent />
          </div>
        </div>
      </div>
    </Section>
  )
}

export default CareersSection
