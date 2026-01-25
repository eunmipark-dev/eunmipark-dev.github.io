import React, { useMemo, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { css } from '@emotion/react'
import ProjectItem from './ProjectItem'
import Section from '../section/Section'
import { projects } from './data'
import { motion, AnimatePresence, Variants } from 'framer-motion'

const categories = ['All', 'Vue', 'React', 'Mapbox', 'Three']

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
    data.allFile.edges.forEach(({ node }) => {
      imageMap[node.base] = node.publicURL
    })
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
    hidden: {
      opacity: 0,
      y: 50, // 시작 위치 (아래)
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0, // 도착 위치
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3 },
    },
  }

  return (
    <Section title="My Work">
      {/* 카테고리 필터 영역 */}
      <div
        css={css`
          display: flex;
          gap: 1.5rem;
          margin-bottom: 3rem;
          border-bottom: 1px solid #eee;
          padding-bottom: 1rem;
        `}
      >
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            css={css`
              background: none;
              border: none;
              cursor: pointer;
              position: relative;
              padding: 0.5rem 0;
              font-size: 0.9rem;
              font-weight: 500;
              color: ${selectedCategory === category ? '#000' : '#888'};
              transition: color 0.3s ease;
              &:hover {
                color: #000;
              }
            `}
          >
            {category}
            {/* 넘버링 첨자 처리 */}
            <span
              css={css`
                font-size: 0.6rem;
                position: absolute;
                top: 0;
                right: -12px;
                color: ${selectedCategory === category ? '#007bff' : '#aaa'};
              `}
            >
              {categoryCounts[category]}
            </span>
          </button>
        ))}
      </div>

      {/* 프로젝트 그리드 */}
      <motion.div
        layout // 레이아웃 변경 시 부드러운 이동
        css={css`
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        `}
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map(project => (
            <motion.div
              key={project.id}
              layout
              variants={cardVariants} // 정의한 variant 연결
              initial="hidden" // 초기 상태
              whileInView="visible" // 뷰포트에 들어왔을 때 실행할 상태
              exit="exit" // 필터링 시 사라지는 상태
              viewport={{ once: false, amount: 0.2 }} // 한번만 실행, 20% 보일 때 트리거
            >
              <ProjectItem
                title={project.title}
                description={project.description}
                image={images[project.imageFileName] || ''}
                tech={project.tech}
                date={project.date}
                link={project.link}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  )
}

export default ProjectsSection
