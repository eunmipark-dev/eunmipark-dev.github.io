import { create } from 'zustand'

import { Themes } from '@src/constants'
import { allowBodyScroll, preventBodyScroll } from '@utils/scroll.util'

import { ImageChildren, MultiSelect } from '@appTypes/notion.type'

interface SnowflakeState {
  isVisibility: boolean
  toggle: () => void
}

export const useSnowflakeStore = create<SnowflakeState>(set => ({
  // 1월, 2월, 12월만 기본값 true로 설정
  isVisibility: [0, 1, 11].includes(new Date().getMonth()),
  toggle() {
    set(({ isVisibility }) => ({ isVisibility: !isVisibility }))
  },
}))

interface ShowSNBState {
  isVisibility: boolean
  toggle: () => void
  show: () => void
  hide: () => void
}
export const useShowSNBStore = create<ShowSNBState>((set, get) => ({
  isVisibility: false,
  toggle() {
    const { isVisibility, hide, show } = get()
    isVisibility ? hide() : show()
  },
  show() {
    set(() => ({ isVisibility: true }))
  },
  hide() {
    set(() => ({ isVisibility: false }))
  },
}))

interface ShowSearchState {
  isVisibility: boolean
  toggle: () => void
  show: () => void
  hide: () => void
}
export const useShowSearchStore = create<ShowSearchState>((set, get) => ({
  isVisibility: false,
  toggle() {
    const { isVisibility, hide, show } = get()
    isVisibility ? hide() : show()
  },
  show() {
    preventBodyScroll()
    set(() => ({ isVisibility: true }))
  },
  hide() {
    allowBodyScroll()
    set(() => ({ isVisibility: false }))
  },
}))

interface ShowImageLayerState {
  isVisibility: boolean
  imageBlock?: ImageChildren
  show: (imageBlock: ImageChildren) => void
  hide: () => void
}
export const useShowImageLayerStore = create<ShowImageLayerState>(
  (set, get) => ({
    isVisibility: false,
    show(imageBlock: ImageChildren) {
      preventBodyScroll()
      set(() => ({ isVisibility: true, imageBlock }))
    },
    hide() {
      allowBodyScroll()
      set(() => ({ isVisibility: false }))
    },
  }),
)

interface ThemeState {
  theme: Themes
  setDarkTheme: () => void
  setLightTheme: () => void
}
export const useThemeStore = create<ThemeState>(set => ({
  theme: Themes.LIGHT,
  setDarkTheme() {
    set(() => ({ theme: Themes.DARK }))
  },
  setLightTheme() {
    set(() => ({ theme: Themes.LIGHT }))
  },
}))

interface EveryPostsTagNamesState {
  everyPostsTagNames: string[]
  set: (everyPostsTagNames: string[]) => void
}
export const useEveryPostsTagNamesStore = create<EveryPostsTagNamesState>(
  set => ({
    everyPostsTagNames: [],
    set: everyPostsTagNames => set(() => ({ everyPostsTagNames })),
  }),
)

interface EveryPostSeriesState {
  everyPostSeries: MultiSelect
  set: (everyPostSeries: MultiSelect) => void
}
export const useEverySeriesNamesStore = create<EveryPostSeriesState>(set => ({
  everyPostSeries: [],
  set: everyPostSeries => set(() => ({ everyPostSeries: everyPostSeries })),
}))
