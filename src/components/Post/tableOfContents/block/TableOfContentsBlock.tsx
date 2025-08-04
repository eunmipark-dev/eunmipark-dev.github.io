import * as React from 'react';

import './TableOfContentsBlock.scss';
import { IconSingleArrow } from '@components/icon';
import { usePostActiveText } from '@hooks/usePostActiveText';
import useVisibility from '@hooks/useVisibility';
import { ARIA_LABEL } from '@src/constants';

import { TableOfContentsItem } from '../item';

interface TableOfContentsBlockProps {
  list: HTMLHeadingElement[];
}

export default function TableOfContentsBlock({ list }: TableOfContentsBlockProps) {
  const showPostIndex = useVisibility();

  const offsetTopPositions = list.map(i => {
    return {
      offsetTop: i.offsetTop,
      name: i.outerText,
    };
  });
  const activeText = usePostActiveText(offsetTopPositions);

  return (
    <section className="table-of-contents-block">
      <div className="table-of-contents-block__wrapper">
        <div
          aria-label={`목차 ${showPostIndex.isVisibility ? ARIA_LABEL.EXPAND_OFF : ARIA_LABEL.EXPAND_ON}`}
          className="table-of-contents-block__wrapper__header"
          onClick={showPostIndex.change}
        >
          <p>목차 {showPostIndex.isVisibility ? ARIA_LABEL.EXPAND_OFF : ARIA_LABEL.EXPAND_ON}</p>
          <div className={`icon-box ${showPostIndex.isVisibility ? 'reverse' : ''}`}>
            <IconSingleArrow direction={'bottom'} size={20} />
          </div>
        </div>
        {!!list?.length && (
          <ol className={`table-of-contents-block__wrapper__list ${showPostIndex.isVisibility ? '' : 'hide'}`}>
            {list.map((item, i) => {
              const text = item.outerText;
              return (
                <TableOfContentsItem
                  key={`table-of-contents-block-side-item-${i}`}
                  isActive={activeText === text}
                  item={item}
                />
              );
            })}
          </ol>
        )}
      </div>
    </section>
  );
}
