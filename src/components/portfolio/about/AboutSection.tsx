// AboutSection.tsx
import React from 'react'
import Section from '../Section'
import './about.scss'

const AboutSection: React.FC = () => {
  return (
    <Section>
      <section className="hero">
        {/* 배경에 은은한 대형 헥사곤 광원 효과 */}
        <div className="hero-bg-hexagon"></div>

        <div className="hero-content">
          <div className="hero-label-wrapper">
            {/* 헥사곤 포인트 아이콘 */}
            <p className="hero-label">FRONT-END DEVELOPER</p>
          </div>

          <h1>
            PARK EUNMI<span className="cursor">_</span>
          </h1>

          <div className="accent-line"></div>

          <div className="description">
            SPECIALIZING IN <strong>MAP-BASED DATA VISUALIZATION</strong> <br />
            & AUTONOMOUS DRIVING MONITORING SYSTEMS.
          </div>
        </div>
      </section>
    </Section>
  )
}

export default AboutSection
