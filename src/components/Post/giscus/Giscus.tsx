import * as React from 'react';
import { useRef, useEffect } from 'react';
import './Giscus.scss';

import { useLocalStorage } from '@hooks/useLocalStorage';
import { CONFIG_THEME_KEY } from '@src/constants';
import { useThemeStore } from '@store/config';

const Giscus = () => {
  const { theme } = useThemeStore();
  const { getConfig } = useLocalStorage();
  const giscusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const configTheme = getConfig(CONFIG_THEME_KEY);
    const dataTheme = configTheme || (window.matchMedia('(prefers-color-scheme: dark') ? 'dark' : 'light');

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'dearlsh94/WeeZip');
    script.setAttribute('data-repo-id', 'R_kgDOJJ6Gag');
    script.setAttribute('data-category', 'Comments');
    script.setAttribute('data-category-id', 'DIC_kwDOJJ6Gas4CaACb');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', dataTheme);
    script.setAttribute('data-lang', 'ko');
    script.setAttribute('cross-origin', 'anonymous');
    script.defer = true;

    if (giscusRef.current) {
      giscusRef.current.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    iframe?.contentWindow?.postMessage(
      {
        giscus: {
          setConfig: {
            theme,
          },
        },
      },
      'https://giscus.app'
    );
  }, [theme]);

  return (
    <div className="giscus-container">
      <p className="giscus-container__comment">
        이 글은 어떠셨나요?
        <br />
        <b>댓글</b>과 <b>반응</b>은 큰 힘이 됩니다. ❣️
      </p>
      <div ref={giscusRef} className="giscus-wrapper" />
    </div>
  );
};

export default Giscus;
