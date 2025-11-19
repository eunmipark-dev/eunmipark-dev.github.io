import React from 'react'

import './TagsFilter.scss'
import { Tag } from '@components/post/tags'
import { useNotion } from '@hooks/useNotion'

export default function TagsFilter() {
  const { everyPostsTags } = useNotion()
  return (
    !!everyPostsTags?.length && (
      <div className="tag-filter">
        <p className="title">TAG</p>
        <div className="tag-filter__items">
          {everyPostsTags.map(name => (
            <Tag key={name} name={name} useLink />
          ))}
        </div>
      </div>
    )
  )
}
