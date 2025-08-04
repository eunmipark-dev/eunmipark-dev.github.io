import * as React from 'react'

import './Series.scss'
import { Linker } from '@components/ui'
import { ARIA_LABEL } from '@src/constants'
import { paths } from '@utils/url.util'

interface SeriesProps {
  name: string
  useLink?: boolean
}

export default function Series({
  name,
  useLink = false,
  ...rest
}: SeriesProps) {
  return React.createElement(
    useLink ? Linker : 'span',
    {
      url: paths.posts({ series: name }),
      label: `${name} 시리즈 목록으로 ${ARIA_LABEL.MOVE}`,
      ...rest,
    },
    <span className={`series-box ${useLink ? 'badge' : 'normal'}`}>
      {name}
    </span>,
  )
}
