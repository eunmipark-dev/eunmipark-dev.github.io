import * as React from 'react';
import './MyButton.scss';

export enum ButtonSize {
  PRIMARY = 'size-primary',
  SECONDARY = 'size-secondary',
  THIRD = 'size-third',
  FOURTH = 'size-fourth',
}

export enum ButtonColor {
  PRIMARY = 'color-primary',
  SECONDARY = 'color-secondary',
}

export enum ButtonType {
  BORDER = 'type-border',
  BG = 'type-bg',
}

interface MyButtonProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLButtonElement>> {
  size: ButtonSize;
  color: ButtonColor;
  type: ButtonType;
  width?: number | '100%';
}

export default function MyButton({ size, color, type, width, className, children, ...rest }: MyButtonProps) {
  return (
    <button
      className={`my-button ${size} ${color} ${type} ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
