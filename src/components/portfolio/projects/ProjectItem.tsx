import React from 'react'
import { css } from '@emotion/react'

interface ProjectItemProps {
  title: string
  description: string
  image: string
  tech: string[]
  date: string
  link?: string
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
      group; /* Hover 효과를 위한 부모 설정 */
      display: flex;
      flex-direction: column;
      border-radius: 12px;
      border: 1px solid rgb(200,200,200);
      overflow: hidden;
      background: #fff;
      transition: all 0.3s ease;
      &:hover {
        transform: translateY(-8px);
      }
    `}
    >
      {/* 이미지 컨테이너 */}
      <div
        css={css`
          width: 100%;
          height: 200px;
          //overflow: hidden;
          background: #f5f5f5;
          position: relative;
        `}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            css={css`
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: transform 0.5s ease;
              &:hover {
                transform: scale(1.05);
              }
            `}
          />
        ) : (
          <div
            css={css`
              /* 이미지 없을 때 대체 UI */
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100%;
              color: #ccc;
            `}
          >
            No Image
          </div>
        )}
      </div>

      {/* 텍스트 컨텐츠 */}
      <div
        css={css`
          padding: 1.5rem 0.5rem;
          height: 120px;
        `}
      >
        <div
          css={css`
            font-size: 0.75rem;
            color: #888;
            margin-bottom: 0.5rem;
          `}
        >
          {tech.join(' / ')}
        </div>
        <h3
          css={css`
            font-size: 1rem;
            margin-bottom: 0.5rem;
            font-weight: 400;
            color: rgb(100, 100, 100);
          `}
        >
          {title}
        </h3>
        {/* <p
          css={css`
            font-size: 0.9rem;
            color: #666;
            line-height: 1.5;
            margin-bottom: 1rem;
          `}
        >
          {description || 'Short project summary goes here.'}
        </p> */}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            css={css`
              font-size: 0.85rem;
              font-weight: 600;
              text-decoration: underline;
              color: #000;
              &:hover {
                color: #007bff;
              }
            `}
          >
            View Project →
          </a>
        )}
      </div>
    </div>
  )
}

export default ProjectItem
