import { create } from 'zustand'

type Theme = 'dark' | 'light'

interface ThemeStore {
  theme: Theme
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeStore>(set => ({
  theme: 'light', // Default to light (white) mode
  toggleTheme: () =>
    set(state => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}))
