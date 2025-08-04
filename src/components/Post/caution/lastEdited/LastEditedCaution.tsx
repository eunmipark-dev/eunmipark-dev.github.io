import React from 'react';

import './LastEditedCaution.scss';
import { Caution } from '@components/ui';

interface LastEditedCautionProps {
  lastEditedDate: Date;
}
export default function LastEditedCaution({ lastEditedDate }: LastEditedCautionProps) {
  const today = new Date();
  const diff: number = Math.floor((today.getTime() - lastEditedDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    diff > 180 && (
      <Caution>
        <em className="last-edited-days">{diff}</em>일 전에 마지막으로 수정된 글입니다.
      </Caution>
    )
  );
}
