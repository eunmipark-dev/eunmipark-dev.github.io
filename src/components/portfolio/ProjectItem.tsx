import React from 'react'
import { css } from '@emotion/react'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'

interface ProjectItemProps {
  title: string
  description: string
  image: IGatsbyImageData
  tech: string[]
  date: string
  link: string
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  description,
  image,
  tech,
  date,
  link,
}) => {
  return (
    <div
      css={css`
        background: var(--project-card-bg);
        border-radius: 8px;
        padding: 0.5rem;
        transition:
          transform 0.2s ease,
          box-shadow 0.2s ease;
        width: 100%;
        box-shadow: var(--shadow);
        @media (min-width: 768px) {
          width: calc(50% - 0.5rem); /* 2-column with gap */
        }
        &:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
      `}
    >
      <GatsbyImage
        image={image}
        alt={title}
        css={css`
          width: 100%;
          height: 140px; /* Slightly shorter to match image */
          border-radius: 4px 4px 0 0;
          object-fit: cover;
        `}
      />
      <h3
        css={css`
          font-size: 1rem;
          margin: 0.5rem 0 0.25rem;
          color: var(--accent-color);
        `}
      >
        {title}
      </h3>
      <p
        css={css`
          font-size: 0.8rem;
          margin-bottom: 0.25rem;
          color: var(--text-secondary);
        `}
      >
        {description}
      </p>
      <p
        css={css`
          font-size: 0.75rem;
          color: var(--text-tertiary);
          margin-bottom: 0.25rem;
        `}
      >
        {tech.join(' · ')}
      </p>
      <p
        css={css`
          font-size: 0.75rem;
          color: var(--text-tertiary);
          margin-bottom: 0.5rem;
        `}
      >
        {date}
      </p>
      <a
        href={link}
        css={css`
          background: var(--button-bg);
          color: var(--button-text);
          padding: 0.3rem 0.6rem;
          border-radius: 4px;
          text-decoration: none;
          font-size: 0.8rem;
          transition: background 0.2s ease;
          &:hover {
            background: var(--button-hover);
          }
        `}
      >
        Go to Page +
      </a>
    </div>
  )
}

export default ProjectItem
