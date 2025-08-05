import * as React from 'react'

import './NBulletedList.scss'
import { NParagraph } from '@components/notion'
import { Contents } from '@components/post'

import { BulletedListItemChildren } from '@appTypes/notion.type'

interface NBulletedListProps {
  bulletedListItem: BulletedListItemChildren
}

export default function NBulletedList({
  bulletedListItem,
}: NBulletedListProps) {
  const { has_children, children } = bulletedListItem

  return (
    <>
      <NParagraph paragraph={bulletedListItem.bulleted_list_item} />
      {has_children && children?.length && <Contents childrens={children} />}
    </>
  )
}
