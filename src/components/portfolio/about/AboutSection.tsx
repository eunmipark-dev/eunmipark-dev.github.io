import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import './about.scss' // SCSS 파일 import (경로 확인)
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

  const skills = [
    { name: 'UDE', link: '#' },
    { name: 'Rapbox', link: '#' },
    { name: 'Three', link: '#' },
    { name: 'React', link: '#' },
    { name: 'Vite', link: '#' },
  ]

  return (
    <Section>
      <div className="about-container">
        {avatarImage && (
          <GatsbyImage
            image={avatarImage}
            alt="Eunni Park"
            className="about-avatar"
          />
        )}
        <div>
          <p className="about-description">
            {' '}
            {/* 클래스 적용 */}
            Hello, my name is Eunni Park, and vehicle monitoring systems. Thank
            you for visiting my page. No map, vehicle monitoring systems.
          </p>
          <div className="about-skills">
            {' '}
            {/* 클래스 적용 */}
            {skills.map((skill, index) => (
              <a key={index} href={skill.link} className="about-skill">
                {' '}
                {/* 클래스 적용 */}
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
