import React from 'react'
import { motion } from 'framer-motion'
import GridFloor from './GridFloor'
import './about.scss'

const AboutSection: React.FC = () => {
  return (
    <section className="about-hero">
      {/* 3D glowing grid floor (robots will roam here later) */}
      <GridFloor />

      {/* foreground identity overlay */}
      <div className="about-overlay">
        <motion.div
          className="about-tag"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="about-tag__bracket">[</span>
          VISUALIZATION ENGINEER
          <span className="about-tag__bracket">]</span>
        </motion.div>

        <motion.h1
          className="about-name"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        >
          PARK&nbsp;EUNMI
        </motion.h1>

        <motion.div
          className="about-line"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />

        <motion.p
          className="about-desc"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          SPECIALIZING IN <strong>MAP-BASED DATA VISUALIZATION</strong>
          <br />
          &amp; ROBOT FLEET / AUTONOMOUS DRIVING MONITORING SYSTEMS
        </motion.p>
      </div>

      {/* corner HUD readouts */}
      <div className="about-hud about-hud--tl">
        <span>LAT 37.4833 N</span>
        <span>LNG 127.0286 E</span>
      </div>
      <div className="about-hud about-hud--br">
        <span>RENDER · WEBGL</span>
        <span className="blink">● LIVE</span>
      </div>
    </section>
  )
}

export default AboutSection
