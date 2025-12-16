import React from 'react'
import Section from './Section'
import { css } from '@emotion/react'
import MapComponent from '@components/main/MapComponent'
import MapComponent2 from '@components/main/MapComponent2'

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
          <MapComponent2
            center={[128.41451, 35.64276]} // 서울 좌표
            zoom={18}
            styleUrl="https://api.maptiler.com/maps/cb21b21b-bd8a-4755-93cf-8c913992e9fe/style.json?key=aICEdYI8vikL3swSJyKg"
            accessToken="cGsuZXlKMUlqb2laMlZ1ZG5acklpd2lZU0k2SW1OcVpUY3hNelp6TnpBMWRtVXlkMjFyTm5rM2FIY3pNVElpZlEuMmZGVkNsOG4zaHIxQkN4a3l4czFsdw=="
            // height="500px" // 높이 조정 (100vh 대신 고정값으로 테스트)
          />
        }
        {/* Replace with MapLibre component, e.g., <Map initialViewState={{...}} /> */}
      </div>
    </Section>
  )
}

export default CareersSection
