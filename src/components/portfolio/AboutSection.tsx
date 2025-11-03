import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { css } from '@emotion/react'
import Section from './Section'

const AboutSection: React.FC = () => {
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
    }
  `)

  const avatarImage = getImage(data.avatar)

  const skills = [
    { name: 'UDE', link: '#' },
    { name: 'Rapbox', link: '#' },
    { name: 'Three', link: '#' },
    { name: 'React', link: '#' },
    { name: 'Vite', link: '#' },
  ]

  const skillStyle = css`
    color: var(--bubble-color);
    background: var(--bubble-bg);
    text-decoration: none;
    padding: 0.3rem 0.8rem;
    border-radius: 4px;
    transition: background 0.2s ease;

    &:hover {
      background: var(--skill-button-hover);
    }
  `

  return (
    <Section title="About Me">
      <div
        css={css`
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          @media (max-width: 768px) {
            flex-direction: column; /* Stack on mobile */
            /* align-items: center; */
          }
        `}
      >
        {avatarImage && (
          <GatsbyImage
            image={avatarImage}
            alt="Eunni Park"
            css={css`
              width: 180px;
              height: 180px;
              border-radius: 8px;
              box-shadow: var(--shadow);
            `}
          />
        )}
        <div>
          <p
            css={css`
              font-size: 0.9rem;
              line-height: 1.4;
              margin-bottom: 0.5rem; /* Tighter spacing */
            `}
          >
            Hello, my name is Eunni Park, and vehicle monitoring systems. Thank
            you for visiting my page. No map, vehicle monitoring systems.
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
  )
}

export default AboutSection
