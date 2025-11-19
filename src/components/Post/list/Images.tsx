import * as React from 'react'

import './Images.scss' // 새 SCSS 파일
import usePagination from '@hooks/usePagination'

import { PostEmptyChecker } from './emptyChecker' // 기존 emptyChecker 재사용
import ImageItem from './item/ImageItem' // 새 ImageItem 컴포넌트
import { Pagination } from '../pagination'

import { NotionNode } from '@appTypes/notion.type'

interface ImagesProps {
  list: NotionNode[]
}

export default function Images({ list }: ImagesProps) {
  const pagination = usePagination({
    perPage: 15, // 페이징 유지, 필요 시 조정
    totalCount: list.length,
  })
  const { indexOfFirstItem, indexOfLastItem } = pagination
  const posts = list.slice(indexOfFirstItem, indexOfLastItem)

  return (
    <PostEmptyChecker length={posts.length}>
      <div className={`images-container`}>
        {posts.map(post => {
          return <ImageItem key={`images-item-${post.id}`} post={post} />
        })}
      </div>
      <Pagination pagination={pagination} />
    </PostEmptyChecker>
  )
}
