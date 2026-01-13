import React from 'react'
import Layout from '@components/portfolio/Layout'
import Header from '@components/portfolio/Header'
import AboutSection from '@components/portfolio/about/AboutSection'
import CareersSection from '@components/portfolio/CareersSection'
import ProjectsSection from '@components/portfolio/projects/ProjectsSection'
import { Divider } from '@components/ui'
import { css } from '@emotion/react' // Emotion import 추가 (이미 다른 파일에서 사용 중이니 문제 없을 것입니다.)
import '../components/portfolio/portfolio.scss'

const harin = css`
  background-image: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.015) 2px,
      rgba(0, 0, 0, 0.015) 4px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.015) 2px,
      rgba(0, 0, 0, 0.015) 4px
    );
  font-family: var(--portfolio-heading);
`

const contentContainerStyle = css`
  margin: 0 auto; /* 중앙 정렬 */
  padding: 0 8rem;
`

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div css={harin}>
        <div css={contentContainerStyle}>
          {' '}
          {/* 새 컨테이너 추가: Divider와 섹션들의 너비를 통합 제어 */}
          <AboutSection />
          <Divider />
          <CareersSection />
          <Divider />
          <ProjectsSection />
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage
