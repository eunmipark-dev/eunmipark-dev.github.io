import React from 'react';

import './TableOfContentsItem.scss';
import { ARIA_LABEL } from '@src/constants';
import { moveToOffset } from '@utils/scroll';

interface TableOfContentsItemProps {
  item: HTMLHeadingElement;
  isActive?: boolean;
}
export default function TableOfContentsItem({ item, isActive }: TableOfContentsItemProps) {
  const tag = item.tagName.toLowerCase();
  const text = item.outerText;

  return (
    <li
      aria-label={`${text} 문단으로 ${ARIA_LABEL.MOVE}`}
      className={`table-of-contents-item-index tag-${tag} ${isActive ? 'active' : ''}`}
      id={`index-${text}`}
      onClick={moveToOffset.bind(null, item.offsetTop)}
    >
      {text}
    </li>
  );
}
