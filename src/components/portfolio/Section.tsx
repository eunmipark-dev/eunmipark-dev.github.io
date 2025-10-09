import React from 'react'
import { css } from '@emotion/react'

interface SectionProps {
  title: string
  children: React.ReactNode
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section
      css={css`
        padding: 1rem; // 패딩 줄임
        background: var(--section-bg);
        margin: 0.5rem 0;
        border-radius: 4px; // 라운드 줄임
        transition: box-shadow 0.2s ease;
        &:hover {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        @media (min-width: 1024px) {
          padding: 1.5rem;
          max-width: 800px; // 넓은 화면 센터, 이미지처럼 좁게
          margin: 1rem auto;
        }
      `}
    >
      <div>
        <h2
          css={css`
            margin-bottom: 0.5rem;
            font-size: 1.2rem;
            color: red;
          `}
        >
          {title}aa
        </h2>
      </div>
      {children}
    </section>
  )
}

export default Section
