import * as React from 'react'

import './NHeading2.scss'
import { NParagraph } from '@components/notion'

import { TextBlock } from '@appTypes'

interface NHeading2Props {
  head2?: TextBlock
}

export default function NHeading2({ head2 }: NHeading2Props) {
  return (
    // TableOfContents 컴포넌트에서 className 사용 중
    <h2 className="table-of-contents-item">
      <NParagraph paragraph={head2} />
    </h2>
  )
}
