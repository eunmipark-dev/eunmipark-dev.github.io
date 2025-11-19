import React from 'react'

import './PostsDescription.scss'

interface PostsDescriptionProps {
  isLoading: boolean
  length: number
  filteredText: string
}

export default function PostsDescription({
  isLoading,
  length,
  filteredText,
}: PostsDescriptionProps) {
  return (
    <div className={`posts-description ${isLoading ? 'loading' : ''}`}>
      <div className="count-box ellipsis">
        {filteredText && (
          <strong>
            {filteredText}
            <span> | </span>
          </strong>
        )}
        A total of <span>{length}</span>
        {filteredText !== '전체' && ' search '} result
      </div>
    </div>
  )
}
