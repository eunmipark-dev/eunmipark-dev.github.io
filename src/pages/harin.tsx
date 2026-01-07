import React from 'react'
import Layout from '@components/portfolio/Layout'
import Header from '@components/portfolio/Header'
import AboutSection from '@components/portfolio/AboutSection'
import CareersSection from '@components/portfolio/CareersSection'
import ProjectsSection from '@components/portfolio/projects/ProjectsSection'
import { Divider } from '@components/ui'
import { css } from '@emotion/react' // Emotion import 추가 (이미 다른 파일에서 사용 중이니 문제 없을 것입니다.)

const contentContainerStyle = css`
  max-width: 1000px; /* 전체 콘텐츠의 최대 너비 제한 */
  margin: 0 auto; /* 중앙 정렬 */
  padding: 0 1rem; /* 모바일에서 여백 추가 (선택적) */
  @media (max-width: 768px) {
    padding: 0 0.5rem; /* 작은 화면에서 조정 */
  }
`

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <Header />
      <div css={contentContainerStyle}>
        {' '}
        {/* 새 컨테이너 추가: Divider와 섹션들의 너비를 통합 제어 */}
        <AboutSection />
        <Divider />
        <CareersSection />
        <Divider />
        <ProjectsSection />
      </div>
    </Layout>
  )
}

export default AboutPage
