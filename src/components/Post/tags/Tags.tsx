import * as React from 'react'

import './Tags.scss'
import Tag from './Tag'

import { MultiSelect } from '@appTypes/index'

interface TagsProps {
  tag: MultiSelect
  useLink?: boolean
}

export default function Tags({ tag, useLink = false }: TagsProps) {
  return (
    <div className="tags-box">
      {tag?.map(tag => (
        <Tag key={`tag-item-${tag.name}`} name={tag.name} useLink={useLink} />
      ))}
    </div>
  )
}
