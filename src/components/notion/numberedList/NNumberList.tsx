import * as React from 'react'

import './NNumberList.scss'
import { NParagraph } from '@components/notion'
import { Contents } from '@components/post'

import { NumberedListItemChildren } from '@appTypes/notion.type'

interface NNumberedListProps {
  numberedListItem: NumberedListItemChildren
}

export default function NNumberedList({
  numberedListItem,
}: NNumberedListProps) {
  const { has_children, children } = numberedListItem
  return (
    <>
      <NParagraph paragraph={numberedListItem.numbered_list_item} />
      {has_children && children?.length && <Contents childrens={children} />}
    </>
  )
}
