import * as React from 'react'

import './LatestPost.scss'

import { Linker } from '@components/ui'
import { useNotion } from '@hooks/useNotion'
import { ARIA_LABEL } from '@src/constants'
import { paths } from '@utils/url.util'

import { LatestPostItem } from './item'

export default function LatestPost() {
  const { posts } = useNotion()

  return (
    <section className="latest-post">
      <div className="latest-post__title">
        <h2>최근 포스트</h2>
        <Linker
          label={`전체 글 페이지로 ${ARIA_LABEL.MOVE}`}
          url={paths.posts()}
        >
          모든 포스트 확인하기
        </Linker>
      </div>
      <ul>
        {posts.slice(0, 6).map(post => {
          return <LatestPostItem key={`latest-post-${post.id}`} post={post} />
        })}
      </ul>
    </section>
  )
}
