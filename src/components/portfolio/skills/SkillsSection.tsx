import React from 'react'
import './skills.scss'
import Section from '../Section'
import { motion } from 'framer-motion'

const SkillsSection: React.FC = () => {
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
    <Section title="SKILLS">
      <div className="skills">
        {skillCategories.map((cat, catIndex) => (
          <motion.div
            key={catIndex}
            className="skillContainer" // Note: Fixed typo from "skiilContainer" to "skillContainer"
            initial={{ opacity: 0, y: 50 }} // Start faded out and shifted down
            whileInView={{ opacity: 1, y: 0 }} // Fade in and slide up on scroll into view
            viewport={{ once: false }} // Animate only once
            transition={{
              duration: 0.6,
              ease: 'easeOut',
              delay: catIndex * 0.2, // Stagger delay for each container (e.g., 0s, 0.2s, 0.4s...)
            }}
          >
            <h3 className="category">{cat.category}</h3>
            {cat.skills.map((skill, index) => (
              <a key={index} href={skill.link} className="skill">
                {skill.name}
              </a>
            ))}
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

export default SkillsSection
