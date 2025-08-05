import { useEffect, useState } from 'react';

import useScroll from './useScroll';

export const usePostActiveText = (
  positions: {
    offsetTop: number;
    name: string;
  }[]
) => {
  const { scrollY } = useScroll();
  const [activeText, setActiveText] = useState('');

  useEffect(() => {
    setActiveText(
      positions.find((item, i) => {
        const activeLine = item.offsetTop - 300;
        const nextOffsetTop = positions[i + 1]?.offsetTop;
        return nextOffsetTop ? activeLine < scrollY && scrollY < nextOffsetTop - 200 : activeLine < scrollY;
      })?.name || ''
    );
  }, [scrollY]);

  return activeText;
};
