import { StaticImage } from 'gatsby-plugin-image'

import * as React from 'react'
import { useEffect, useState } from 'react'

import './Header.scss'

import { IconDarkTheme, IconLightTheme, IconSearch } from '@components/icon'
import { Linker } from '@components/ui'
import useScroll from '@hooks/useScroll'
import useTheme from '@hooks/useTheme'
import { ARIA_LABEL, Themes } from '@src/constants'
import { useShowSearchStore, useThemeStore } from '@store/config'
import { moveToTop } from '@utils/scroll.util'

export default function Header() {
  const { show: handleShowSearch } = useShowSearchStore()
  const { theme } = useThemeStore()
  const { changeAndSaveTheme } = useTheme()

  const { scrollY, isScrollingUp, isBottom } = useScroll()
  const [status, setStatus] = useState('')
  const [postTitle, setPostTitle] = useState('')

  useEffect(() => {
    setStatus(scrollY < 160 || isScrollingUp || isBottom ? '' : 'invisible')
  }, [scrollY, isScrollingUp])

  useEffect(() => {
    const elTitle = document.querySelector<HTMLHeadingElement>(
      '.post-title h1.title',
    )
    setPostTitle(elTitle?.outerText || '')
  }, [])

  return (
    <header className={`${status}`}>
      <Linker label={`홈으로 ${ARIA_LABEL.MOVE}`} url="/">
        <div className="icon-box">
          <StaticImage
            alt="Weezip Logo"
            className="logo"
            src="../../images/Tesseract-Logo-128x128.png"
            width={36}
          />
        </div>
      </Linker>
      {scrollY > 200 && postTitle && (
        <p className="title" onClick={moveToTop}>
          {postTitle}
        </p>
      )}
      <div className="right-box">
        {theme === 'light' ? (
          <button
            aria-label={`현재 라이트 모드. 다크 모드로 ${ARIA_LABEL.EDIT}`}
            className="icon-box"
            onClick={() => changeAndSaveTheme(Themes.DARK)}
          >
            <IconLightTheme />
          </button>
        ) : (
          <button
            aria-label={`현재 다크 모드. 라이트 모드로 ${ARIA_LABEL.EDIT}`}
            className="icon-box"
            onClick={() => changeAndSaveTheme(Themes.LIGHT)}
          >
            <IconDarkTheme />
          </button>
        )}
        <button
          aria-label={`검색창 ${ARIA_LABEL.OPEN}`}
          className="icon-box"
          onClick={handleShowSearch}
        >
          <IconSearch />
        </button>
      </div>
    </header>
  )
}
