import React from 'react'
import { Project } from '@data/about_data'

interface ProjectsSectionProps {
  projects: Project[]
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => (
  <div>
    <h2>Projects</h2>
    {projects.map(project => (
      <div key={project.id}>
        <h3>{project.title}</h3>
        <p>Company: {project.company}</p>
        <p>Period: {project.period}</p>
        <ul>
          {project.roles.map((role, index) => (
            <li key={index}>{role}</li>
          ))}
        </ul>
        <p>Tech: {project.tech}</p>
        {project.etc && (
          <ul>
            {project.etc.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </div>
)

export default ProjectsSection
