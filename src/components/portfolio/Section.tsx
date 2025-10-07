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
        padding: 2rem;
        background: var(--section-bg);
        margin: 1rem 0;
        border-radius: 8px;
        transition:
          transform 0.2s ease,
          box-shadow 0.2s ease;

        &:hover {
          transform: translateY(-5px); /* Lift on hover */
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        @media (min-width: 1024px) {
          padding: 3rem; /* More padding on wide screens */
          max-width: 1200px;
          margin: 2rem auto; /* Center on wide screens */
        }

        @media (max-width: 768px) {
          padding: 1rem;
        }
      `}
    >
      <h2
        css={css`
          margin-bottom: 1rem;
        `}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

export default Section
