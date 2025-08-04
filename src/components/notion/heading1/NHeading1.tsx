import * as React from 'react'

import './NHeading1.scss'
import { NParagraph } from '@components/notion'

import { TextBlock } from '@appTypes'

interface NHeading1Props {
  head1?: TextBlock
}

export default function NHeading1({ head1 }: NHeading1Props) {
  return (
    // TableOfContents 컴포넌트에서 className 사용 중
    <h1 className="table-of-contents-item">
      <NParagraph paragraph={head1} />
    </h1>
  )
}
