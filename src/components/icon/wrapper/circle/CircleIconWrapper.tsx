import * as React from 'react';
import './CircleIconWrapper.scss';

interface CircleIconWrapperProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  color: 'mono' | 'reverse-mono' | 'secondary';
  size?: number;
}

export default function CircleIconWrapper({ children, color = 'mono', size = 36, ...rest }: CircleIconWrapperProps) {
  return (
    <div
      className={`circle-icon-wrapper ${color}`}
      role={rest.onClick ? 'button' : 'img'}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
