import * as React from 'react';

import './CircleProgress.scss';
import { IconCircleProgress } from '@components/icon';

interface CircleProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: number;
}

export default function CircleProgress({ height }: CircleProgressProps) {
  return (
    <div
      className="circle-progress-box"
      style={{
        height: height ? `${height}px` : 'auto',
      }}
    >
      <IconCircleProgress color={'primary'} viewBox={'0 0 2048 2048'} />
    </div>
  );
}
