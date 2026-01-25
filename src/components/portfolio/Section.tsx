import React from 'react'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'

interface SectionProps {
  title?: string // Make title optional
  children: React.ReactNode
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section
      css={css`
        padding: 10rem 0rem;
        border-radius: 8px;
        transition: box-shadow 0.2s ease;
        font-size: 2.7rem;

        @media (min-width: 1024px) {
          padding: 2.2x-sizing: inheritrem 0rem;
        }
      `}
    >
      {title && ( // Conditionally render title if it exists
        <h2
          css={css`
            margin-bottom: 2rem;
            font-size: 6rem;
            color: #fff;
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
