import * as React from 'react';
import { useEffect, useState } from 'react';

import './ScrollProgress.scss';
import useScroll from '@hooks/useScroll';

export default function ScrollProgress() {
  const { scrollY } = useScroll(10);
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (scrollY > 100) {
      setStatus('visible');
    } else {
      setStatus('');
    }

    let windowScroll = document?.body.scrollTop || document?.documentElement.scrollTop;
    let height = document?.documentElement.scrollHeight - document?.documentElement.clientHeight;

    setProgress((windowScroll / height) * 100);
  }, [scrollY]);

  return (
    <div className={`scroll-progress-container ${status}`}>
      <div
        className="scroll-progress"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}
