import React from 'react'

import './Tag.scss'
import { Linker } from '@components/ui'
import { ARIA_LABEL } from '@src/constants'
import { paths } from '@utils/url.util'

interface TagProps {
  name: string
  useLink?: boolean
}

export default function Tag({ name, useLink = false, ...rest }: TagProps) {
  return React.createElement(
    useLink ? Linker : 'span',
    {
      url: paths.posts({ tag: name }),
      label: `${name} 목록으로 ${ARIA_LABEL.MOVE}`,
      ...rest,
    },
    <span className={`tag-item ${useLink ? 'linked' : 'normal'}`}>
      #{name}
    </span>,
  )
}
