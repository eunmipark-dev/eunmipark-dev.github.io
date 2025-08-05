import { useEffect } from 'react';

import { CONFIG_THEME_KEY, Themes } from '@src/constants';
import { useThemeStore } from '@store/config';

import { useLocalStorage } from './useLocalStorage';

const useTheme = () => {
  const { setConfig, getConfig } = useLocalStorage();
  const { setDarkTheme, setLightTheme } = useThemeStore();

  useEffect(() => {
    const configTheme = getConfig(CONFIG_THEME_KEY);
    switch (configTheme) {
      case Themes.DARK:
        changeAndSaveTheme(Themes.DARK);
        break;
      case Themes.LIGHT:
        changeAndSaveTheme(Themes.LIGHT);
        break;
      default:
        changeThemeBasedOnSystemPreference();
        break;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? Themes.DARK : Themes.LIGHT;
      changeAndSaveTheme(newTheme);
    };
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const changeThemeBasedOnSystemPreference = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (mediaQuery.matches) {
      changeAndSaveTheme(Themes.DARK);
    } else {
      changeAndSaveTheme(Themes.LIGHT);
    }
  };

  const changeAndSaveTheme = (theme: Themes) => {
    document.documentElement.setAttribute(CONFIG_THEME_KEY, theme);
    theme === Themes.DARK ? setDarkTheme() : setLightTheme();
    setConfig(CONFIG_THEME_KEY, theme);
  };

  return { changeAndSaveTheme };
};

export default useTheme;
