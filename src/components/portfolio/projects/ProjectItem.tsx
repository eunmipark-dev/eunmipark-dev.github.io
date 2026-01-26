/* ProjectItem.tsx */
import React from 'react'
import { css } from '@emotion/react'
import './project.scss'

interface ProjectItemProps {
  title: string
  image: string
  tech: string[]
  description: string
  date: string
  link?: string
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  image,
  tech,
  link,
}) => {
  return (
    <div className="project-card">
      <div className="project-card-inner">
        <div className="project-image">
          {image ? (
            <img src={image} alt={title} />
          ) : (
            <div className="no-image">NO DATA</div>
          )}
        </div>
        <div className="project-info">
          <div className="project-tech">{tech.join(' / ')}</div>
          <h3 className="project-title">{title}</h3>

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="go-to-page"
            >
              GO TO PAGE
              <span className="arrow">↗</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectItem
