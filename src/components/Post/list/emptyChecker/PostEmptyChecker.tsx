import { navigate } from 'gatsby'
import React, { ReactElement, ReactNode } from 'react'

import { IconClearAll } from '@components/icon'
import './PostEmptyChecker.scss'
import { ARIA_LABEL } from '@src/constants'
import { paths } from '@utils/url.util'

interface PostEmptyCheckerProps extends React.PropsWithChildren {
  length: number
  children: ReactNode
}

export default function PostEmptyChecker({
  length,
  children,
}: PostEmptyCheckerProps): ReactElement {
  const handleAllPosts = () => {
    navigate(paths.posts())
  }

  // children이 undefined일 경우 빈 요소로 대체
  const renderChildren = children || <></>

  return length ? (
    (renderChildren as ReactElement)
  ) : (
    <div className="posts-empty">
      <p>검색 결과가 없습니다.</p>
      <p>전체 글들을 둘러보는 건 어떠세요?</p>
      <span
        aria-label={`글 목록 페이지로 ${ARIA_LABEL.MOVE}`}
        role="button"
        onClick={handleAllPosts}
      >
        <IconClearAll size={16} />
        전체글 보러가기
      </span>
    </div>
  )
}
