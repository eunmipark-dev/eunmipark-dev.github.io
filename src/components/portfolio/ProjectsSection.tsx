import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { css } from '@emotion/react'
import ProjectItem from './ProjectItem'
import Section from './Section'

const ProjectsSection: React.FC = () => {
  const data = useStaticQuery(graphql`
    query {
      project1: file(relativePath: { eq: "project1.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            layout: FULL_WIDTH
            placeholder: BLURRED
            formats: [AUTO, WEBP]
          )
        }
      }
      project2: file(relativePath: { eq: "project2.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            layout: FULL_WIDTH
            placeholder: BLURRED
            formats: [AUTO, WEBP]
          )
        }
      }
    }
  `)

  const project1Image = getImage(data.project1)
  const project2Image = getImage(data.project2)

  return (
    <Section title="Projects">
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        `}
      >
        {project1Image && (
          <ProjectItem
            title="Scenario Editor"
            description="Desktop app for editing scenario data editing tool based on standard-based service"
            image={project1Image}
            tech={['React', 'Three']}
            date="2021.12 ~ 2024.12"
            link="#"
          />
        )}
        {project2Image && (
          <ProjectItem
            title="Local Shuttle Bus Tracking"
            description="blabla"
            image={project2Image}
            tech={['Rapbox']}
            date="2021.08 ~ 2021.12"
            link="#"
          />
        )}
      </div>
    </Section>
  )
}

export default ProjectsSection
