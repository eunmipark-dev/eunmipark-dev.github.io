import React from 'react'
import Section from './Section'
import { css } from '@emotion/react'
import MapComponent from '@components/main/MapComponent'

const CareersSection: React.FC = () => {
  return (
    <Section title="Careers">
      <div
        css={css`
          background: var(--background-color); /* Matches mode */
          border: 1px solid var(--border-color);
          border-radius: 8px;
          height: 600px; /* Approximate height from image */
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-tertiary);
          font-size: 0.9rem;
          box-shadow: var(--shadow);
        `}
      >
        {
          <MapComponent
            center={[127.0, 37.5]} // 서울 좌표
            zoom={10}
            styleUrl="https://demotiles.maplibre.org/style.json"
            // height="500px" // 높이 조정 (100vh 대신 고정값으로 테스트)
          />
        }
        {/* Replace with MapLibre component, e.g., <Map initialViewState={{...}} /> */}
      </div>
    </Section>
  )
}

export default CareersSection
