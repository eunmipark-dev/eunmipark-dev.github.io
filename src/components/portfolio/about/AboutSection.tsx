import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { css } from '@emotion/react'
import Section from '../Section'

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

  const skillCategories = [
    {
      category: 'frontend',
      skills: [
        { name: 'TypeScript', link: '#' },
        { name: 'Vue', link: '#' },
        { name: 'Vite', link: '#' },
        { name: 'React', link: '#' },
      ],
    },
    {
      category: 'backend',
      skills: [
        { name: 'Node', link: '#' },
        { name: 'Express', link: '#' },
        { name: 'Spring', link: '#' },
      ],
    },
    {
      category: 'Map',
      skills: [
        { name: 'Mapbox', link: '#' },
        { name: 'OpenLayers', link: '#' },
      ],
    },
    {
      category: 'Tools',
      skills: [
        { name: 'PostgreSql', link: '#' },
        { name: 'Git', link: '#' },
      ],
    },
  ]

  return (
    <Section>
      <div
        css={css`
          flex-direction: column-reverse;
          text-align: center;
          gap: 3rem;
        `}
      >
        <h1
          css={css`
            font-size: 5rem;
            line-height: 1.1;
            margin-bottom: 3.5rem;
            font-weight: 800;
            letter-spacing: -0.04em;

            .cursor {
              opacity: 0;
              animation: cursor 1s infinite;
              color: rgb(125, 125, 125);
            }
            @keyframes cursor {
              0% {
                opacity: 0;
              }
              40% {
                opacity: 0;
              }
              50% {
                opacity: 1;
              }
              90% {
                opacity: 1;
              }
              100% {
                opacity: 0;
              }
            }
          `}
        >
          PARK EUNMI
          <a className="cursor">_</a>
        </h1>

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

        <div
          css={css`
            font-size: 1.2rem;
            line-height: 1.4;
            margin: 4rem 0rem 2.5rem 0rem;
            color: rgb(95, 95, 95);
          `}
        >
          Hi, I'm Eunni Park. Thanks for checking out my page! <div />I
          specialize in creating map-based data visualizations.
        </div>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            gap: 2rem;
            font-size: 0.8rem;
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            padding-top: 4rem;

            @media (max-width: 768px) {
              flex-direction: column;
              gap: 1.5rem;
            }
          `}
        >
          {skillCategories.map((cat, catIndex) => (
            <div
              key={catIndex}
              css={css`
                flex: 1;
                text-align: left;
                border-right: 1px solid #ddd;
                padding-right: 1rem;

                &:last-child {
                  border-right: none;
                  padding-right: 0;
                }

                @media (max-width: 768px) {
                  border-right: none;
                  padding-right: 0;
                  text-align: center;
                }
              `}
            >
              <h3
                css={css`
                  color: #aaa;
                  font-size: 1.2rem;
                  font-weight: normal;
                  margin-bottom: 1.5rem;
                  text-transform: uppercase;
                `}
              >
                {cat.category}
              </h3>
              {cat.skills.map((skill, index) => (
                <a
                  key={index}
                  href={skill.link}
                  css={css`
                    display: block;
                    color: #333;
                    text-decoration: none;
                    margin-bottom: 0.5rem;
                    transition:
                      transform 0.3s ease,
                      color 0.3s ease;
                    font-size: 1.2rem;

                    &:hover {
                      transform: translateX(5px);
                      color: #007bff;
                    }
                  `}
                >
                  {skill.name}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default AboutSection
