import React from 'react'
import { useThemeStore } from '@store/themeStore'
import { Global, css } from '@emotion/react'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useThemeStore()

  return (
    <div data-theme={theme}>
      <Global
        styles={css`
          body {
            background-color: var(--background-color);
            color: var(--text-color);
            transition:
              background-color 0.3s ease,
              color 0.3s ease;
          }
        `}
      />
      {children}
    </div>
  )
}

export default Layout
