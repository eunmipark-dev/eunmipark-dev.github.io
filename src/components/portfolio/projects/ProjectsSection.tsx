import React, { useMemo, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import ProjectItem from './ProjectItem'
import { projects } from './data'
import './project.scss'

const categories = ['All', 'Vue', 'React', 'Mapbox', 'Three', 'Konva']

const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          relativeDirectory: { eq: "portfolio" }
          extension: { regex: "/(jpg|png|jpeg|gif)/i" }
        }
      ) {
        edges {
          node {
            base
            publicURL
          }
        }
      }
    }
  `)

  const images = useMemo(() => {
    const imageMap: { [key: string]: string | undefined } = {}
    data.allFile.edges.forEach(
      ({ node }: { node: { base: string; publicURL: string } }) => {
        imageMap[node.base] = node.publicURL
      },
    )
    return imageMap
  }, [data])

  const categoryCounts = useMemo(() => {
    const counts: { [key: string]: number } = {}
    categories.forEach(cat => {
      counts[cat] =
        cat === 'All'
          ? projects.length
          : projects.filter(p => p.tech.includes(cat)).length
    })
    return counts
  }, [])

  const filteredProjects = projects.filter(
    project =>
      selectedCategory === 'All' || project.tech.includes(selectedCategory),
  )

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.25 } },
  }

  return (
    <div className="projects-view">
      <header className="projects-view__head">
        <div className="projects-view__heading">
          <span className="projects-view__label">SELECTED WORK</span>
          <h2 className="projects-view__title">PROJECT ARCHIVE</h2>
        </div>

        <div className="project-filters">
          {categories.map(category => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`project-category ${selectedCategory === category ? 'active' : ''}`}
            >
              {category}
              <span className="project-category-count">
                {String(categoryCounts[category]).padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>
      </header>

      <div className="projects-view__scroll">
        <motion.div layout className="projects-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map(project => (
              <motion.div
                key={project.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <ProjectItem
                  title={project.title}
                  description={project.description}
                  image={images[project.imageFileName] || ''}
                  tech={project.tech}
                  date={project.date}
                  organization={project.organization}
                  link={project.link}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default ProjectsSection
