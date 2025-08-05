import React from 'react'

import './PostsItem.scss'
import { Series, TitleDescription } from '@components/post'
import { Linker } from '@components/ui'
import { ARIA_LABEL } from '@src/constants'
import { getPlainTextByRichText, notionNodeToJson } from '@utils/notion.util'

import { NotionNode } from '@appTypes/notion.type'

interface PostsItemProps {
  post: NotionNode
}
export default function PostsItem({ post }: PostsItemProps) {
  const content = notionNodeToJson(post)
  const title = getPlainTextByRichText(content?.properties?.remark?.rich_text)

  return (
    <li className="posts-item">
      <Linker
        label={`${title} 글 페이지로 ${ARIA_LABEL.MOVE}`}
        url={post.title}
      >
        <div className={`posts-item__content`}>
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
      </Linker>
    </li>
  )
}
