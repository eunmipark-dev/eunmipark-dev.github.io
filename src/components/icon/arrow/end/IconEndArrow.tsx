import * as React from 'react';

import { PropsWithDirection, SvgController, SvgControllerProps } from '@components/icon/SvgController';

export default function IconEndArrow(props: PropsWithDirection<SvgControllerProps>) {
  const getRotateDegree = () => {
    const { direction } = props;
    switch (direction) {
      case 'top':
        return 0;
      case 'right':
        return 90;
      case 'left':
        return 270;
      case 'bottom':
        return 180;
      default:
        return 0;
    }
  };
  return (
    <SvgController rotate={getRotateDegree()} viewBox="0 0 24 24" {...props}>
      <path
        d="M5 3h14m-1 10l-6-6l-6 6m6-6v14"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </SvgController>
  );
}
