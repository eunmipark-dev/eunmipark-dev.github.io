import React from 'react';

import './Share.scss';
import { IconCopyLink } from '@components/icon';
import { CircleIconWrapper } from '@components/icon/wrapper';
import useClipboard from '@hooks/useClipboard';
import { ARIA_LABEL } from '@src/constants';

export default function Share() {
  const { copyToClipboard } = useClipboard();

  const handleCopy = async () => {
    await copyToClipboard(location.href);
    alert('현재 게시글 주소가 복사되었습니다.');
  };

  return (
    <div className="share-box">
      <CircleIconWrapper aria-label={`현재 게시글 주소 ${ARIA_LABEL.COPY}`} color={'secondary'} onClick={handleCopy}>
        <IconCopyLink />
      </CircleIconWrapper>
    </div>
  );
}
