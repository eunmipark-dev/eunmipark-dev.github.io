import * as React from 'react';

import { SvgController, SvgControllerProps } from '@components/icon/SvgController';

export default function IconHamburgerMenu(props: SvgControllerProps) {
  return (
    <SvgController {...props}>
      <path d="M2 6a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm0 6.032a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm1 5.032a1 1 0 1 0 0 2h18a1 1 0 0 0 0-2H3Z" />
    </SvgController>
  );
}
