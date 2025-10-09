import React from 'react'
import { useThemeStore } from '@store/themeStore'
import { css } from '@emotion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons' // Add these icons to your dependencies if needed
import { IconProp } from '@fortawesome/fontawesome-svg-core' // Add this import

const Header: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore()

  const moonIcon = faMoon as IconProp // Cast here
  const sunIcon = faSun as IconProp // Cast here

  return (
    <header
      css={css`
        position: sticky;
        top: 0;
        z-index: 1000;
        background: var(--header-bg);
        backdrop-filter: blur(10px); /* Blur effect */
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--border-color);
        transition: background 0.3s ease;

        @media (max-width: 768px) {
          padding: 0.5rem; /* Smaller padding on mobile */
        }
      `}
    >
      <h1
        css={css`
          margin: 0;
          font-size: 1.5rem;
        `}
      >
        Eunni Park
      </h1>
      <button
        onClick={toggleTheme}
        css={css`
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-color);
          transition: transform 0.2s ease;

          &:hover {
            transform: scale(1.1); /* Hover effect */
          }
        `}
      >
        <FontAwesomeIcon
          icon={theme === 'light' ? moonIcon : sunIcon}
          size="lg"
        />
      </button>
    </header>
  )
}

export default Header
