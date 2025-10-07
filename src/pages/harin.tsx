import React from 'react'
import Layout from '@components/portfolio/Layout'
import Header from '@components/portfolio/Header'
import Section from '@components/portfolio/Section'
import ProjectItem from '@components/portfolio/ProjectItem'
import { css } from '@emotion/react'

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Section title="About Me">
        {/* Content: Image, text, tech links */}
        <img
          src="/profile.jpg"
          alt="Eunni Park"
          css={css`
            width: 100px;
          `}
        />
        <p>Hello, my name is Eunni Park...</p>
        {/* Links with hover: Use css for color change */}
      </Section>
      <Section title="Careers">
        {/* Custom Map: Use MapLibre components */}
        <div>Custom Map</div> {/* Integrate map here */}
      </Section>
      <Section title="Projects">
        <div
          css={css`
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
          `}
        >
          <ProjectItem
            title="Scenario Editor"
            description="..."
            image="..."
            tech={['React', 'Three']}
            date="2021.12 - 2024.12"
          />
          {/* Add more */}
        </div>
      </Section>
    </Layout>
  )
}

export default AboutPage
