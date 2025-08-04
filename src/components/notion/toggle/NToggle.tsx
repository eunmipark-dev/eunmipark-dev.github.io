import * as React from 'react'

import './NToggle.scss'

import { IconSingleArrow } from '@components/icon'
import { NParagraph } from '@components/notion'
import { Contents } from '@components/post'
import { ARIA_LABEL } from '@src/constants'

import { NotionChildrenType, TextBlock } from '@appTypes'

interface NToggleProps {
  toggle: TextBlock
  childList: NotionChildrenType[]
}

export default function NToggle({ toggle, childList }: NToggleProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const change = () => setIsOpen(!isOpen)

  return (
    <details className="block-toggle">
      <summary
        aria-expanded={isOpen}
        aria-label={`현재 토글 블럭 ${isOpen ? ARIA_LABEL.EXPAND_OFF : ARIA_LABEL.EXPAND_ON}`}
        className="toggle-title-box"
        role="button"
        onClick={change}
      >
        <div className={`icon-box`}>
          <IconSingleArrow direction={isOpen ? 'bottom' : 'right'} size={16} />
        </div>
        <NParagraph paragraph={toggle} />
      </summary>
      <section aria-hidden={!isOpen} className="toggle-content-box">
        <Contents childrens={childList} />
      </section>
    </details>
  )
}
