import React from 'react'

import './LatestPostItem.scss'
import { IconSingleArrow } from '@components/icon'
//import { Tags } from '@components/post';
import { Linker } from '@components/ui'
import { ARIA_LABEL } from '@src/constants'

import { NotionNode } from '@appTypes/notion.type'

interface LatestPostItemProps {
  post: NotionNode
}

export default function LatestPostItem({ post }: LatestPostItemProps) {
  return (
    <li className="latest-post-item">
      <Linker
        label={`${post.notionColumn.remark} 글 페이지로 ${ARIA_LABEL.MOVE}`}
        url={post.title}
      >
        <p>{post.notionColumn?.remark}</p>
        {/* {post.notionColumn.tag && <Tags tag={post.notionColumn.tag} />} */}
        <div className="corner" />
        <IconSingleArrow color={'primary'} direction="right" size={12} />
      </Linker>
    </li>
  )
}
