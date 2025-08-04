import React from 'react'

import './OutLink.scss'
import { MyButton } from '@components/ui'
import {
  ButtonColor,
  ButtonSize,
  ButtonType,
} from '@components/ui/button/MyButton'
import { Linker } from '@components/ui/linker'
import { ARIA_LABEL } from '@src/constants'
import { paths } from '@utils/url.util'

import { Select } from '@appTypes'
interface OutLinkProps {
  series?: Select
}
export default function OutLink({ series }: OutLinkProps) {
  return (
    <div className="out-link-box">
      {series && (
        <Linker
          label={`${series.name} 시리즈 목록으로 ${ARIA_LABEL.MOVE}`}
          url={paths.posts({ series: series?.name })}
        >
          <MyButton
            className="series-button"
            color={ButtonColor.PRIMARY}
            size={ButtonSize.PRIMARY}
            type={ButtonType.BORDER}
            width={'100%'}
          >
            <span>{series.name}</span>
            시리즈 전체보기
          </MyButton>
        </Linker>
      )}
      <Linker
        label={`전체 목록 페이지로 ${ARIA_LABEL.MOVE}`}
        url={paths.posts()}
      >
        <MyButton
          color={ButtonColor.PRIMARY}
          size={ButtonSize.PRIMARY}
          type={ButtonType.BORDER}
          width={'100%'}
        >
          포스트 전체보기
        </MyButton>
      </Linker>
    </div>
  )
}
