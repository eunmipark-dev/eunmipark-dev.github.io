import React from 'react'
import Layout from '@components/portfolio/Layout'
import Header from '@components/portfolio/Header'
import Section from '@components/portfolio/Section'
import ProjectItem from '@components/portfolio/ProjectItem'
import { css } from '@emotion/react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const AboutPage: React.FC = () => {
  const data = useStaticQuery(graphql`
    query {
      avatar: file(relativePath: { eq: "profile.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            width: 100
            placeholder: BLURRED
            formats: [AUTO, WEBP]
          )
        }
      }
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

  const avatarImage = getImage(data.avatar)
  const project1Image = getImage(data.project1)
  const project2Image = getImage(data.project2)

  const skills = [
    { name: 'UDE', link: '#' },
    { name: 'Rapbox', link: '#' },
    { name: 'Three', link: '#' },
    { name: 'React', link: '#' },
    { name: 'Vite', link: '#' },
  ]

  // 공통 스킬 스타일
  const skillStyle = css`
    color: var(--accent-color);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  `

  return (
    <Layout>
      <Header />
      <Section title="About Me">
        <div
          css={css`
            display: flex;
            align-items: flex-start;
            gap: 1rem;
          `}
        >
          {avatarImage && (
            <GatsbyImage
              image={avatarImage}
              alt="Eunni Park"
              css={css`
                width: 80px;
                height: 80px;
                border-radius: 8px;
              `}
            />
          )}
          <div>
            <p
              css={css`
                font-size: 0.9rem;
                line-height: 1.4;
              `}
            >
              Hello, my name is Eunni Park, and vehicle monitoring systems.
              Thank you for visiting my page. No map, vehicle monitoring
              systems.
            </p>
            <div
              css={css`
                display: flex;
                gap: 0.5rem;
                flex-wrap: wrap;
                font-size: 0.8rem;
              `}
            >
              {skills.map((skill, index) => (
                <a key={index} href={skill.link} css={skillStyle}>
                  {skill.name}
                </a>
              ))}
            </div>
          </div>
        </div>
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
    </Layout>
  )
}

export default AboutPage
