// SkillsSection.tsx
import React from 'react'
import { motion, Variants } from 'framer-motion'
import Section from '../section/Section'
import './skills.scss'

const skillsData = [
  {
    category: 'Core Frontend',
    items: ['React', 'Vue', 'TypeScript', 'JavaScript (ES6+)'],
  },
  {
    category: 'Graphics & Map',
    items: ['Three.js', 'Mapbox GL JS', 'Canvas API', 'WebGL'],
  },
  {
    category: 'Build & Tools',
    items: ['Vite', 'Webpack', 'Emotion', 'SCSS'],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

const SkillsSection: React.FC = () => {
  return (
    <Section title="Skills">
      <motion.div
        className="skills-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: '-100px' }}
      >
        {skillsData.map((group, idx) => (
          <motion.div key={idx} className="skill-card" variants={itemVariants}>
            <div className="skill-card-inner">
              <div className="card-header">
                <h3>{group.category}</h3>
              </div>
              <ul className="skill-list">
                {group.items.map((item, i) => (
                  <li key={i} className="skill-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

export default SkillsSection
