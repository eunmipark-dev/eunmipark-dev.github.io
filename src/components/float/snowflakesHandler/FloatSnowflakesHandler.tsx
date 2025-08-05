import React from 'react';

import { IconSnow } from '@components/icon';
import { CircleIconWrapper } from '@components/icon/wrapper';
import { ARIA_LABEL } from '@src/constants';
import { useSnowflakeStore } from '@store/config';

export default function FloatSnowflakesHandler() {
  const { isVisibility, toggle } = useSnowflakeStore();

  return (
    <CircleIconWrapper
      aria-label={`눈송이 효과 ${isVisibility ? ARIA_LABEL.TOGGLE_OFF : ARIA_LABEL.TOGGLE_ON}`}
      color="secondary"
      size={44}
      onClick={toggle}
    >
      <IconSnow color={`${isVisibility ? `primary` : `secondary`}`} direction="top" />
    </CircleIconWrapper>
  );
}
