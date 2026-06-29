/* ProjectItem.tsx */
import React from 'react'
import './project.scss'

interface ProjectItemProps {
  title: string
  image: string
  tech: string[]
  description: string
  date: string
  organization?: string
  link?: string
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  image,
  tech,
  date,
  organization,
  link,
}) => {
  return (
    <div className="project-card">
      <div className="project-card-inner">
        <div className="project-image">
          {image ? (
            <img src={image} alt={title} loading="lazy" />
          ) : (
            <div className="no-image">NO SIGNAL</div>
          )}
          <span className="project-image__scan" aria-hidden />
          {date && <span className="project-date">{date}</span>}
        </div>

        <div className="project-info">
          <div className="project-tech">
            {tech.map(t => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <h3 className="project-title">{title}</h3>

          <div className="project-foot">
            {organization && (
              <span className="project-org">@ {organization}</span>
            )}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="go-to-page"
              >
                LAUNCH<span className="arrow">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectItem
