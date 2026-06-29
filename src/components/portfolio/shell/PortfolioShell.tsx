import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import NavBar from './NavBar'
import { DEFAULT_SECTION, SectionId } from './nav'
import AboutSection from '../about/AboutSection'
import CareersSkillsView from '../careers/CareersSkillsView'
import ProjectsSection from '../projects/ProjectsSection'
import ContactSection from '../contact/ContactSection'
import './shell.scss'

const VIEWS: Record<SectionId, React.FC> = {
  about: AboutSection,
  careers: CareersSkillsView,
  projects: ProjectsSection,
  contact: ContactSection,
}

const PortfolioShell: React.FC = () => {
  const [active, setActive] = useState<SectionId>(DEFAULT_SECTION)
  const ActiveView = VIEWS[active]

  return (
    <div className="portfolio-root cy-shell">
      {/* background layers */}
      <div className="cy-shell__bg" aria-hidden>
        <div className="cy-shell__bg-grid" />
        <div className="cy-shell__bg-glow" />
        <div className="cy-shell__bg-vignette" />
        <div className="cy-shell__bg-scan" />
      </div>

      <NavBar active={active} onSelect={setActive} />

      <main className="cy-shell__outlet">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="cy-shell__view"
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          >
            <ActiveView />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default PortfolioShell
