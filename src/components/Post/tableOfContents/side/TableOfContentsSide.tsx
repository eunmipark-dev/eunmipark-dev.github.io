import * as React from 'react';

import './TableOfContentsSide.scss';
import { TableOfContentsItem } from '@components/post';
import { usePostActiveText } from '@hooks/usePostActiveText';
import { SideLayout } from '@layout/side';
import { ARIA_LABEL } from '@src/constants';
import { moveToTop } from '@utils/scroll';

interface TableOfContentsSideProps {
  list: HTMLHeadingElement[];
}

export default function TableOfContentsSide({ list }: TableOfContentsSideProps) {
  const offsetTopPositions = list.map(i => {
    return {
      offsetTop: i.offsetTop,
      name: i.outerText,
    };
  });
  const activeText = usePostActiveText(offsetTopPositions);

  return (
    <SideLayout option={{ useExpandControl: true }}>
      <ol className="table-of-contents-side">
        <li aria-label={`페이지 최상단으로 ${ARIA_LABEL.MOVE}`} className="tag-top" onClick={moveToTop}>
          맨위로
        </li>
        {list.map((item, i) => {
          const text = item.outerText;
          return (
            <TableOfContentsItem key={`table-of-contents-side-item-${i}`} isActive={activeText === text} item={item} />
          );
        })}
      </ol>
    </SideLayout>
  );
}
