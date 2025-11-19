import React from 'react'

import './ImageItem.scss' // 새 SCSS 파일
import { Series, TitleDescription } from '@components/post'
import { Linker } from '@components/ui'
import { ARIA_LABEL } from '@src/constants'
import { getPlainTextByRichText, notionNodeToJson } from '@utils/notion.util'

import { NotionNode } from '@appTypes/notion.type'

interface ImageItemProps {
  post: NotionNode
}
export default function ImageItem({ post }: ImageItemProps) {
  const content = notionNodeToJson(post)
  const title = getPlainTextByRichText(content?.properties?.remark?.rich_text)
  const thumbnailUrl = content?.properties?.image?.files[0]?.file?.url || '' // 썸네일 URL 추출, fallback 빈 문자열

  return (
    <div className="image-item">
      {' '}
      {/* li 대신 div로 그리드 아이템 */}
      <Linker
        label={`${title} 글 페이지로 ${ARIA_LABEL.MOVE}`}
        url={post.title}
      >
        <div className={`image-item__content`}>
          <div className="image-item__thumbnail-wrapper">
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt={`${title} 썸네일`}
                className="image-item__thumbnail"
                loading="lazy" // 성능 최적화
              />
            ) : (
              <div className="image-item__placeholder" /> // 플레이스홀더로 공간 확보
            )}
          </div>
          <div className="image-item__info">
            {content?.properties?.series?.select && (
              <Series name={content?.properties?.series?.select?.name} />
            )}
            <p>{title}</p>
            <TitleDescription
              createdDate={content?.properties?.created_date}
              editedDate={content?.properties?.edited_date}
              tag={content?.properties?.tag?.multi_select}
              useCopy={false}
            />
          </div>
        </div>
      </Linker>
    </div>
  )
}
