import * as React from 'react';

import { PropsWithDirection, SvgController, SvgControllerProps } from '@components/icon/SvgController';

export default function IconDoubleArrow(props: PropsWithDirection<SvgControllerProps>) {
  const getRotateDegree = () => {
    const { direction } = props;
    switch (direction) {
      case 'top':
        return 270;
      case 'right':
        return 0;
      case 'left':
        return 180;
      case 'bottom':
        return 90;
      default:
        return 0;
    }
  };
  return (
    <SvgController rotate={getRotateDegree()} {...props}>
      <g>
        <path d="M5.7 17.3q-.275-.275-.275-.7t.275-.7L9.575 12L5.7 8.1q-.275-.275-.288-.687T5.7 6.7q.275-.275.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375q0 .2-.062.375t-.213.325l-4.6 4.6q-.275.275-.687.288T5.7 17.3Zm6.6 0q-.275-.275-.275-.7t.275-.7l3.875-3.9L12.3 8.1q-.275-.275-.288-.687T12.3 6.7q.275-.275.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375q0 .2-.063.375t-.212.325l-4.6 4.6q-.275.275-.687.288T12.3 17.3Z" />
      </g>
    </SvgController>
  );
}
