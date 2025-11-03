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
        padding: 3.5rem 2.5rem;
        /* background: var(--section-bg); */
        margin: 0.5rem 0;
        border-radius: 8px;
        transition: box-shadow 0.2s ease;
        /* box-shadow: var(--shadow); */

        @media (min-width: 1024px) {
          padding: 3.5rem;
          max-width: 1000px;
          margin: 1rem auto;
        }
      `}
    >
      <h2
        css={css`
          margin-bottom: 0.75rem;
          font-size: 1.3rem;
          color: var(--text-color);
          font-weight: 600;
        `}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

export default Section
