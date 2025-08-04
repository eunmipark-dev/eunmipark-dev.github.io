import * as React from 'react';
import { useState, ReactNode } from 'react';

import './SideLayout.scss';
import { GlobalPortal } from '@components/GlobalPortal';
import { IconSingleArrow } from '@components/icon';

interface Option {
  useExpandControl?: boolean;
  direction?: 'left' | 'right';
}
interface SideLayoutProps {
  children: ReactNode;
  option?: Option;
}

export default function SideLayout({ option, children }: SideLayoutProps) {
  const { useExpandControl = false, direction = 'left' } = option || {};
  const [isExpand, setIsExpand] = useState(true);
  const handleToggleExpand = () => setIsExpand(prev => !prev);

  return (
    <GlobalPortal.Consumer>
      <aside aria-modal={true} className={`side-layout ${direction} ${isExpand ? 'expand' : 'shrink'}`}>
        {isExpand && <div className={`content`}>{children}</div>}
      </aside>

      {useExpandControl && (
        <button
          className={`side-layout-controller ${direction} ${isExpand ? 'expand' : 'shrink'}`}
          onClick={handleToggleExpand}
        >
          <IconSingleArrow
            color={'primary'}
            direction={direction === 'left' ? `${isExpand ? 'left' : 'right'}` : `${isExpand ? 'right' : 'left'}`}
          />
        </button>
      )}
    </GlobalPortal.Consumer>
  );
}
