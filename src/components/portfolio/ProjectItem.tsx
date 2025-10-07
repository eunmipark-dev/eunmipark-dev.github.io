import React from 'react'
import { css } from '@emotion/react'

interface ProjectItemProps {
  title: string
  description: string
  image: string // URL or Gatsby Image
  tech: string[]
  date: string
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  description,
  image,
  tech,
  date,
}) => {
  return (
    <div
      css={css`
        background: var(--background-color);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 1rem;
        transition: transform 0.2s ease;

        &:hover {
          transform: scale(1.05); /* Zoom on hover */
        }

        @media (min-width: 768px) {
          flex: 1 1 45%; /* Two columns on wider screens */
        }
      `}
    >
      <img
        src={image}
        alt={title}
        css={css`
          width: 100%;
          border-radius: 4px;
        `}
      />
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{tech.join(', ')}</p>
      <p>{date}</p>
    </div>
  )
}

export default ProjectItem
