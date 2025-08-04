import * as React from 'react';
import './Divider.scss';

interface DividerProps {
  color?: string;
  height?: number;
  margin?: number;
}

export default function Divider({ color, height, margin }: DividerProps) {
  return (
    <hr
      aria-orientation="horizontal"
      className={`block-divider ${color}`}
      role="separator"
      style={{
        margin: `${margin || 16}px 0`,
        height: `${height || 1}px`,
      }}
    />
  );
}
