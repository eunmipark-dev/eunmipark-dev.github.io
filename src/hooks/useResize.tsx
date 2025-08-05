import { useEffect, useState } from 'react'

import { throttle } from '@utils/common.util'

const useResize = (delay = 30) => {
  const [resizedInnerWidth, setResizedInnerWidth] = useState(0)
  const [resizedInnerHeight, setResizedInnerHeight] = useState(0)

  const handleResize = throttle(() => {
    setResizedInnerWidth(window.innerWidth)
    setResizedInnerHeight(window.innerHeight)
  }, delay)

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return {
    resizedInnerWidth,
    resizedInnerHeight,
  }
}

export default useResize
