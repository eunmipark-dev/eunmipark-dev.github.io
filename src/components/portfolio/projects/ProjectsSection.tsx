// ProjectsSection.tsx (기존 파일 수정)
import React, { useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { css } from '@emotion/react'
import ProjectItem from './ProjectItem'
import Section from '../Section'
import { projects } from './data' // 별도 파일에서 import

const ProjectsSection: React.FC = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          relativeDirectory: { eq: "portfolio" }
          extension: { regex: "/(jpg|png|jpeg|gif)/i" } # GIF 추가, 대소문자 무시
        }
      ) {
        edges {
          node {
            base
            publicURL # 정적 URL 쿼리 (GIF 포함 모든 이미지에 사용)
          }
        }
      }
    }
  `)

  const images = useMemo(() => {
    console.log(data)
    const imageMap: { [key: string]: string | undefined } = {}
    data.allFile.edges.forEach(({ node }) => {
      imageMap[node.base] = node.publicURL // publicURL을 맵에 저장
    })

    console.log(imageMap)
    return imageMap
  }, [data])

  return (
    <Section title="Projects">
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        `}
      >
        {projects.map(project => {
          const projectImage =
            images[project.imageFileName] || images['project_default.jpg'] // 디폴트 이미지 사용
          if (!projectImage) return null // 디폴트도 없으면 스킵 (필요 시 fallback 추가)
          return (
            <ProjectItem
              key={project.id}
              title={project.title}
              description={project.description}
              image={projectImage} // 이제 문자열 URL 전달
              tech={project.tech}
              date={project.date}
              link={project.link}
            />
          )
        })}
      </div>
    </Section>
  )
}

export default ProjectsSection
