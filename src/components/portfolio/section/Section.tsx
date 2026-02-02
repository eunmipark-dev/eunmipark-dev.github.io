import React from 'react'
import { motion } from 'framer-motion'
import './section.scss'

interface SectionProps {
  title?: string
  children: React.ReactNode
  className?: string
}

const Section: React.FC<SectionProps> = ({ title, children, className }) => {
  return (
    <section className={`section-container ${className || ''}`}>
      {title && (
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }} // 화면에 약간 들어왔을 때 실행되도록 여백 조정
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
        >
          {title}
        </motion.h2>
      )}
      <div className="section-content">{children}</div>
    </section>
  )
}

export default Section
