import React from 'react'
import { css } from '@emotion/react'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image' // 타입 추가

interface ProjectItemProps {
  title: string
  description: string
  image: IGatsbyImageData
  tech: string[]
  date: string
  link: string
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  description,
  image,
  tech,
  date,
  link,
}) => {
  return (
    <div
      css={css`
        background: #2d3748; // 다크 모드 카드 배경 (이미지 맞춤), var(--section-bg) 사용 가능
        border-radius: 8px;
        padding: 0.5rem;
        transition: transform 0.2s ease;
        width: 100%; // 좁은 화면 full
        @media (min-width: 768px) {
          width: 48%; // 넓은 화면 2열
        }
        &:hover {
          transform: scale(1.02);
        }
      `}
    >
      <GatsbyImage
        image={image}
        alt={title}
        css={css`
          width: 100%;
          height: 150px;
          border-radius: 4px 4px 0 0;
          object-fit: cover;
        `}
      />
      <h3
        css={css`
          font-size: 1rem;
          margin: 0.5rem 0;
          color: var(--accent-color);
        `}
      >
        {title}
      </h3>
      <p
        css={css`
          font-size: 0.8rem;
          margin-bottom: 0.5rem;
        `}
      >
        {description}
      </p>
      <p
        css={css`
          font-size: 0.8rem;
          color: #a0aec0;
        `}
      >
        {tech.join(' · ')}
      </p>
      <p
        css={css`
          font-size: 0.8rem;
          color: #a0aec0;
          margin-bottom: 0.5rem;
        `}
      >
        {date}
      </p>
      <a
        href={link}
        css={css`
          background: #4a5568; // 버튼 색상 (이미지 다크 모드 맞춤)
          color: #fff;
          padding: 0.3rem 0.6rem;
          border-radius: 4px;
          text-decoration: none;
          font-size: 0.8rem;
          &:hover {
            background: #2d3748;
          }
        `}
      >
        Go to Page +
      </a>
    </div>
  )
}

export default ProjectItem
