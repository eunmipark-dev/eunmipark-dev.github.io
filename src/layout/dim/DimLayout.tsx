import * as React from 'react';
import './DimLayout.scss';

import { ARIA_LABEL } from '@src/constants';

interface DimLayoutProps {
  children: React.ReactNode;
  handleClose?: () => void;
}

export default function DimLayout({ children, handleClose }: DimLayoutProps) {
  return (
    <>
      {children}
      {handleClose && (
        <aside
          aria-hidden={true}
          aria-label={`팝업 ${ARIA_LABEL.CLOSE}`}
          className="dim-layout"
          onClick={handleClose}
        />
      )}
    </>
  );
}
