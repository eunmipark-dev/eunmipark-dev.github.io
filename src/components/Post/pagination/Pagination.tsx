import * as React from 'react';

import './Pagination.scss';
import { IconEndArrow, IconSingleArrow } from '@components/icon';
import { MyButton } from '@components/ui';
import { ButtonColor, ButtonSize, ButtonType } from '@components/ui/button/MyButton';
import { paginationController } from '@hooks/usePagination';
import { ARIA_LABEL } from '@src/constants';

interface PaginationProps {
  pagination: paginationController;
}

export default function Pagination({ pagination }: PaginationProps) {
  const { lastPage, currentPage } = pagination;

  return (
    <div className="posts-pagination">
      <div className="left-box">
        {lastPage > 2 && (
          <MyButton
            aria-label={`첫 페이지로 ${ARIA_LABEL.MOVE}`}
            className={`page-button first ${currentPage === 1 ? 'disabled' : 'active'}`}
            color={ButtonColor.PRIMARY}
            size={ButtonSize.THIRD}
            type={ButtonType.BORDER}
            width={45}
            onClick={pagination.first}
          >
            <IconEndArrow color="base" direction="left" size={18} />
          </MyButton>
        )}
        <MyButton
          aria-label={`이전 페이지로 ${ARIA_LABEL.MOVE}`}
          className={`page-button prev ${currentPage === 1 ? 'disabled' : 'active'}`}
          color={ButtonColor.PRIMARY}
          size={ButtonSize.THIRD}
          type={ButtonType.BORDER}
          width={45}
          onClick={pagination.prev}
        >
          <IconSingleArrow color="base" direction="left" size={12} />
        </MyButton>
      </div>
      <div className="center-box">
        {currentPage !== 1 && (
          <span className="prev" onClick={pagination.prev}>
            {Math.max(currentPage - 1, 1)}
          </span>
        )}
        <span className="current">{currentPage}</span>
        {currentPage !== lastPage && (
          <span className="next" onClick={pagination.next}>
            {Math.min(currentPage + 1, lastPage)}
          </span>
        )}
      </div>
      <div className="right-box">
        <MyButton
          aria-label={`다음 페이지로 ${ARIA_LABEL.MOVE}`}
          className={`page-button next ${currentPage === lastPage ? 'disabled' : 'active'}`}
          color={ButtonColor.PRIMARY}
          size={ButtonSize.THIRD}
          type={ButtonType.BORDER}
          width={45}
          onClick={pagination.next}
        >
          <IconSingleArrow color="base" direction="right" size={12} />
        </MyButton>
        {lastPage > 2 && (
          <MyButton
            aria-label={`마지막 페이지로 ${ARIA_LABEL.MOVE}`}
            className={`page-button last ${currentPage === lastPage ? 'disabled' : 'active'}`}
            color={ButtonColor.PRIMARY}
            size={ButtonSize.THIRD}
            type={ButtonType.BORDER}
            width={45}
            onClick={pagination.last}
          >
            <IconEndArrow color="base" direction="right" size={18} />
          </MyButton>
        )}
      </div>
    </div>
  );
}
