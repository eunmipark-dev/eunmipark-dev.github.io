import * as React from 'react'

import './NHeading3.scss'
import { NParagraph } from '@components/notion'

import { TextBlock } from '@appTypes'

interface NHeading3Props {
  head3?: TextBlock
}

export default function NHeading3({ head3 }: NHeading3Props) {
  return (
    // TableOfContents 컴포넌트에서 className 사용 중
    <h3 className="table-of-contents-item">
      <NParagraph paragraph={head3} />
    </h3>
  )
}
