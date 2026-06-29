import React from 'react'
import { Global, css } from '@emotion/react'
import PortfolioShell from '@components/portfolio/shell/PortfolioShell'
import '../components/portfolio/portfolio.scss'

// Futuristic command-center portfolio — the site homepage.
// One page, section-based navigation (About / Careers / Projects / Contact).
// Locked to the cyber dark palette regardless of the global theme toggle.
const IndexPage: React.FC = () => {
  return (
    <>
      <Global
        styles={css`
          html,
          body {
            margin: 0;
            padding: 0;
            background-color: #050a12;
            overflow-x: hidden;
          }
          body {
            color: #d6ecf7;
          }
        `}
      />
      <PortfolioShell />
    </>
  )
}

export default IndexPage
