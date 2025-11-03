import React from 'react'
import Layout from '@components/portfolio/Layout'
import Header from '@components/portfolio/Header'
import AboutSection from '@components/portfolio/AboutSection'
import CareersSection from '@components/portfolio/CareersSection'
import ProjectsSection from '@components/portfolio/ProjectsSection'

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <Header />
      <AboutSection />
      <CareersSection />
      <ProjectsSection />
    </Layout>
  )
}

export default AboutPage
