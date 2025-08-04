export const preventBodyScroll = () => (document.body.style.overflow = 'hidden')
export const allowBodyScroll = () => (document.body.style.overflow = 'auto')

export const moveToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

export const moveToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  })
}

export const moveToOffset = (offset: number) => {
  window.scrollTo({
    top: offset,
    behavior: 'smooth',
  })
}
