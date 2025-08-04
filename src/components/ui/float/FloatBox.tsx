import * as React from 'react';

import './FloatBox.scss';
import { FloatMoveTop, FloatSnowflakesHandler } from '@components/float';

interface FloatBoxProps {
  useTop?: boolean;
  useSnowflake?: boolean;
}

export default function FloatBox({ useTop, useSnowflake }: FloatBoxProps) {
  return (
    <div className={`float-box`}>
      {useTop && <FloatMoveTop />}
      {useSnowflake && <FloatSnowflakesHandler />}
    </div>
  );
}
