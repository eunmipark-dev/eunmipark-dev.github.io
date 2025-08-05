import React from 'react'

import './TitleDescription.scss'
import { IconCopyLink } from '@components/icon'
import { CreateDate, EditDate } from '@components/post'
import { Tags } from '@components/post/tags'
import useClipboard from '@hooks/useClipboard'
import { ARIA_LABEL } from '@src/constants'

import { DateProperty, MultiSelect } from '@appTypes/notion.type'
interface TitleDescriptionProps {
  tag?: MultiSelect
  createdDate?: DateProperty
  editedDate?: DateProperty
  useCopy?: boolean
  useTagLink?: boolean
  isShowTag?: boolean
}
export default function TitleDescription({
  tag,
  createdDate,
  editedDate,
  useCopy = true,
  useTagLink = false,
  isShowTag = true,
}: TitleDescriptionProps) {
  const { copyToClipboard } = useClipboard()

  const handleCopy = async () => {
    await copyToClipboard(location.href)
    alert('현재 게시글 주소가 복사되었습니다.')
  }
  return (
    <div className="title-description">
      {isShowTag && <Tags tag={tag} useLink={useTagLink} />}
      <div className="title-description__right">
        {useCopy && (
          <IconCopyLink
            aria-label={`현재 게시글 주소 ${ARIA_LABEL.COPY}`}
            color="secondary"
            size={18}
            onClick={handleCopy}
          />
        )}
        {createdDate && <CreateDate strDate={createdDate?.date?.start} />}
        {editedDate && <EditDate strDate={editedDate?.date?.start} />}
      </div>
    </div>
  )
}
