import * as React from 'react';
import './SvgController.scss';

export interface SvgControllerProps extends React.PropsWithChildren<React.SVGProps<SVGSVGElement>> {
  size?: number;
  color?: 'mono' | 'reverse-mono' | 'base' | 'primary' | 'secondary' | 'third' | 'black' | 'white';
  rotate?: number;
}

export type PropsWithDirection<P = SvgControllerProps> = P & { direction?: 'top' | 'right' | 'left' | 'bottom' };

export function SvgController({
  size = 24,
  color = 'mono',
  direction,
  rotate = 0,
  children,
  viewBox = '0 0 24 24',
  ...rest
}: SvgControllerProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      className={`svg-wrapper ${color} ${rest.onClick ? 'pointer' : ''} ${direction || ''} ${rest.className || ''}`}
      height={size}
      role={rest.onClick ? 'button' : 'img'}
      viewBox={viewBox}
      width={size}
    >
      <g transform={`rotate(${rotate} 12 12)`}>{children}</g>
    </svg>
  );
}
