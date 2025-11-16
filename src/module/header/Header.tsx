import { StaticImage } from 'gatsby-plugin-image'
import * as React from 'react'
import { useEffect, useState, useRef } from 'react'

import './Header.scss'

import {
  IconDarkTheme,
  IconLightTheme,
  IconSearch,
  IconHamburger,
} from '@components/icon'
import { Linker } from '@components/ui'
import useScroll from '@hooks/useScroll'
import useTheme from '@hooks/useTheme'
import { ARIA_LABEL, Themes, SIDE_MENUS } from '@src/constants'
import { useShowSearchStore, useThemeStore } from '@store/config'
import { moveToTop } from '@utils/scroll.util'

export default function Header() {
  const { show: handleShowSearch } = useShowSearchStore()
  const { theme } = useThemeStore()
  const { changeAndSaveTheme } = useTheme()

  const { scrollY, isScrollingUp, isBottom } = useScroll()
  const [status, setStatus] = useState('')
  const [postTitle, setPostTitle] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false) // 초기값을 false로 변경 (SSR 안전)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setStatus(scrollY < 160 || isScrollingUp || isBottom ? '' : 'invisible')
  }, [scrollY, isScrollingUp])

  useEffect(() => {
    const elTitle = document.querySelector<HTMLHeadingElement>(
      '.post-title h1.title',
    )
    setPostTitle(elTitle?.outerText || '')
  }, [])

  useEffect(() => {
    // 클라이언트 측에서만 실행되도록 체크
    if (typeof window === 'undefined') return

    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768
      if (newIsMobile !== isMobile) {
        setIsMobile(newIsMobile)
        if (!newIsMobile && isMenuOpen) setIsMenuOpen(false)
      }
    }

    // 초기 설정
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isMenuOpen, isMobile]) // 의존성 배열 유지

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        !document.querySelector('.menu-overlay')?.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, []) // 빈 배열로 한 번만 실행

  const toggleMenu = () => setIsMenuOpen(prev => !prev)

  return (
    <>
      <header className={`${status}`}>
        <Linker label={`홈으로 ${ARIA_LABEL.MOVE}`} url="/">
          <div>
            <StaticImage
              alt="Blog Logo"
              className="logo"
              src="../../images/logo.png"
              width={100}
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
          {isMobile && (
            <button
              ref={buttonRef}
              aria-label={`메뉴 ${isMenuOpen ? '닫기' : '열기'}`}
              className="icon-box menu-button"
              onClick={toggleMenu}
            >
              <IconHamburger />
            </button>
          )}
          {!isMobile && (
            <nav className="menu">
              <ul className="menu-list">
                {SIDE_MENUS.map(nav => (
                  <li key={nav.url}>
                    <Linker
                      label={`${nav.title} ${ARIA_LABEL.MOVE}`}
                      target={nav.isOutLink ? '_blank' : '_parent'}
                      url={nav.url}
                    >
                      {nav.title}
                    </Linker>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </header>
      {isMenuOpen && isMobile && (
        <div className={`menu-overlay ${isMenuOpen ? 'open' : ''}`}>
          <div className="menu-list">
            {SIDE_MENUS.map(nav => (
              <div key={nav.url} className="menu">
                <Linker
                  label={`${nav.title} ${ARIA_LABEL.MOVE}`}
                  target={nav.isOutLink ? '_blank' : '_parent'}
                  url={nav.url}
                >
                  {nav.title}
                </Linker>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
