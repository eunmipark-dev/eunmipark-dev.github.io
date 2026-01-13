// ProjectItem.tsx (width 관련 코드 제거)
import React from 'react'
import { css } from '@emotion/react'

interface ProjectItemProps {
  title: string
  description: string
  image: string // 이제 문자열 URL (GatsbyImageData 대신)
  tech: string[]
  date: string
  link: string | undefined
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
        background: var(--project-card-bg);
        border: 1px solid rgb(200, 200, 200);
        border-radius: 10px;

        transition:
          transform 0.2s ease,
          box-shadow 0.2s ease;
        //box-shadow: var(--shadow);
        /* width 제거: 부모 Grid가 자동 처리 */

        &:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
      `}
    >
      <img
        src={image} // 일반 img 태그로 GIF 지원
        alt={title}
        css={css`
          width: 100%;
          height: 140px; /* Slightly shorter to match image */
          border-radius: 8px 8px 4px 4px;
          /*border-radius: 20px;*/
          object-fit: cover;
          padding: 2px 2px 0px 2px;
          margin-bottom: 0px;
        `}
        loading="lazy" // lazy loading 추가 (성능 최적화)
      />
      <div
        css={css`
          padding: 3px 10px 10px 10px;
        `}
      >
        <h3
          css={css`
            font-size: 1rem;
            margin-block: 0px;
            margin-bottom: 0.25rem;
            color: black;
          `}
        >
          {title}
        </h3>
        <p
          css={css`
            font-size: 0.8rem;
            margin-bottom: 0.25rem;
            color: var(--text-secondary);
          `}
        >
          {description}
        </p>
        <p
          css={css`
            font-size: 0.75rem;
            color: var(--text-tertiary);
            margin-bottom: 0.25rem;
          `}
        >
          {tech.join(' · ')}
        </p>
        <p
          css={css`
            font-size: 0.75rem;
            color: var(--text-tertiary);
            margin-bottom: 0.5rem;
          `}
        >
          {date}
        </p>
        {link && (
          <a
            href={link}
            css={css`
              /*background: rgb(165, 165, 165);*/
              color: black;
              border: 1px solid black;
              padding: 0.3rem 0.6rem;
              border-radius: 4px;
              text-decoration: none;
              font-size: 0.8rem;
              transition: background 0.2s ease;
              &:hover {
                background: var(--button-hover);
              }
            `}
          >
            Go to Page +
          </a>
        )}
      </div>
    </div>
  )
}

export default ProjectItem
