import React from 'react'
import Layout from '@components/portfolio/Layout'
import Header from '@components/portfolio/Header'
import AboutSection from '@components/portfolio/about/AboutSection'
import CareersSection from '@components/portfolio/careers/CareersSection'
import ProjectsSection from '@components/portfolio/projects/ProjectsSection'
import SkillsSection from '@components/portfolio/skills/SkillsSection'
import ContactSection from '@components/portfolio/contact/ContactSection'
import { Divider } from '@components/ui'
import { css } from '@emotion/react' // Emotion import 추가 (이미 다른 파일에서 사용 중이니 문제 없을 것입니다.)
import '../components/portfolio/portfolio.scss'
const harin = css`
  /* 베이스 배경색: 깊고 어두운 블랙 */
  background-color: #0a0a0a;

  background-image: 
    /* 1. 하단으로 갈수록 패턴을 자연스럽게 숨겨주는 마스크 그라데이션 */
    linear-gradient(
      to bottom,
      rgba(10, 10, 10, 0) 0%,
      rgba(10, 10, 10, 0.4) 30%,
      rgba(10, 10, 10, 0.9) 80%,
      #0a0a0a 100%
    ),
    /* 2. 수학적으로 설계된 싱글 라인 허니콤 (겹치는 선 없음) */
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='1'/%3E%3C/svg%3E"),
    /* 3. 상단에 입체감을 주는 미세한 다크 그레이 그라데이션 */
      linear-gradient(to bottom, #1a1a1a 0%, #0a0a0a 100%);

  /* 중요: background-size가 SVG의 viewBox(56:100)와 정확히 일치해야 합니다.
     패턴 크기를 조절하고 싶다면 비율을 유지하며 (28, 50) 또는 (112, 200) 등으로 변경하세요.
  */
  background-size:
    100% 100%,
    56px 100px,
    100% 100%;

  //background-attachment: fixed;
  font-family: var(--portfolio-heading);
  min-height: 100vh;
  color: #ffffff;
  transition: background 0.3s ease;
`
const contentContainerStyle = css`
  margin: 0 auto; /* 중앙 정렬 */
  //padding: 0 2rem;
`

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div css={harin}>
        <div css={contentContainerStyle}>
          {' '}
          {/* 새 컨테이너 추가: Divider와 섹션들의 너비를 통합 제어 */}
          <AboutSection />
          {/* <Divider /> */}
          <SkillsSection />
          {/* <Divider /> */}
          <CareersSection />
          {/* <Divider /> */}
          <ProjectsSection />
          {/* <Divider /> */}
          <ContactSection />
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage
