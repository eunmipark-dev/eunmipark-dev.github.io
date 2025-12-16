import { useEffect, useRef, useState } from 'react'

import { throttle } from '@utils/common.util'

const useScroll = (
  delay: number = 10,
): { scrollY: number; isScrollingUp: boolean; isBottom: boolean } => {
  const [scrollY, setScrollY] = useState(0)
  const [isScrollingUp, setIsScrollingUp] = useState(false)
  const [isBottom, setIsBottom] = useState(false)
  const lastScrollTop = useRef(0)

  const handleScroll = throttle(() => {
    const currentScroll = window.scrollY
    setScrollY(window.scrollY)
    setIsScrollingUp(currentScroll < lastScrollTop.current)
    lastScrollTop.current = currentScroll

    const pageHeight = document.documentElement.offsetHeight
    const windowHeight = window.innerHeight
    setIsBottom(windowHeight + currentScroll > pageHeight * 0.93)
  }, delay)

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return {
    scrollY,
    isScrollingUp,
    isBottom,
  }
}

export default useScroll
