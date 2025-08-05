import React, { useState } from 'react'

import './SNBOpenIcon.scss'
import { IconDoubleArrow, IconHamburger } from '@components/icon'
import { ARIA_LABEL } from '@src/constants'
import { useShowSNBStore } from '@store/config'

export default function SNBOpenIcon() {
  const { isVisibility, toggle: handleToggleSNB } = useShowSNBStore()
  const [isMenuHover, setIsMenuHover] = useState(false)

  return (
    <button
      aria-label={`사이드바 메뉴 ${ARIA_LABEL.OPEN}`}
      className="snb-open-icon"
      onBlur={() => setIsMenuHover(false)}
      onClick={handleToggleSNB}
      onFocus={() => setIsMenuHover(true)}
      onMouseLeave={() => setIsMenuHover(false)}
      onMouseOver={() => setIsMenuHover(true)}
    >
      {isVisibility ? (
        <IconDoubleArrow direction={'left'} size={28} />
      ) : isMenuHover ? (
        <IconDoubleArrow
          direction={isVisibility ? 'left' : 'right'}
          size={28}
        />
      ) : (
        <IconHamburger size={28} />
      )}
    </button>
  )
}
