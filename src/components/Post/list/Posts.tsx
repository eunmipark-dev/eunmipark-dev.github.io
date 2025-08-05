import * as React from 'react'

import './Posts.scss'
import usePagination from '@hooks/usePagination'

import { PostEmptyChecker } from './emptyChecker'
import { PostsItem } from './item'
import { Pagination } from '../pagination'

import { NotionNode } from '@appTypes/notion.type'

interface PostsProps {
  list: NotionNode[]
}

export default function Posts({ list }: PostsProps) {
  const pagination = usePagination({
    perPage: 15,
    totalCount: list.length,
  })
  const { indexOfFirstItem, indexOfLastItem } = pagination
  const posts = list.slice(indexOfFirstItem, indexOfLastItem)

  return (
    <PostEmptyChecker length={posts.length}>
      <ul className={`posts-container`}>
        {posts.map(post => {
          return <PostsItem key={`posts-item-${post.id}`} post={post} />
        })}
      </ul>
      <Pagination pagination={pagination} />
    </PostEmptyChecker>
  )
}
