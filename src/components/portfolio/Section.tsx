import React from 'react'
import { css } from '@emotion/react'

interface SectionProps {
  title?: string // Make title optional
  children: React.ReactNode
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section
      css={css`
        //padding: 1.5rem 0rem;
        /* background: var(--section-bg); */
        //margin: 0.5rem 0; /* 기존 여백 유지 (필요 시 조정) */
        border-radius: 8px;
        transition: box-shadow 0.2s ease;
        /* box-shadow: var(--shadow); */

        @media (min-width: 1024px) {
          padding: 3.5rem 0rem;
        }
      `}
    >
      {title && ( // Conditionally render title if it exists
        <h2
          css={css`
            margin-bottom: 0.75rem;
            font-size: 1.3rem;
            color: var(--text-color);
            font-weight: 600;
            text-align: center; // Center align the title
          `}
        >
          {title}
        </h2>
      )}
      {children}
    </section>
  )
}

export default Section
