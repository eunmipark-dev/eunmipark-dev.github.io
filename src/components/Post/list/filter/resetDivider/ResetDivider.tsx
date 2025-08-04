import { navigate } from 'gatsby'

import * as React from 'react'

import './ResetDivider.scss'
import { IconClearAll } from '@components/icon'
import { Divider } from '@components/ui'
import { ARIA_LABEL } from '@src/constants'
import { paths } from '@utils/url.util'

export default function ResetDivider() {
  const handleAllPosts = () => {
    navigate(paths.posts())
  }
  return (
    <div className="reset-divider">
      <Divider color="primary" height={2} />
      <span
        aria-label={`글 목록 페이지로 ${ARIA_LABEL.MOVE}`}
        className="reset"
        role="button"
        onClick={handleAllPosts}
      >
        <IconClearAll />
        전체 글 보기
      </span>
    </div>
  )
}
