import * as React from 'react'

import { NParagraph } from '@components/notion'
import { Linker } from '@components/ui'
import { ARIA_LABEL } from '@src/constants'

import { Bookmark, TextBlock, TextItem } from '@appTypes/index'

interface NBookmarkProps {
  bookmark: Bookmark
}

export default function NBookmark({ bookmark }: NBookmarkProps) {
  return (
    <Linker
      label={`${bookmark.url} 위치로 ${ARIA_LABEL.MOVE}`}
      target="_blank"
      url={bookmark.url}
    >
      {bookmark.caption?.length ? (
        bookmark.caption.map((c: TextItem, i) => {
          const captionParagraph: TextBlock = {
            color: 'gray',
            rich_text: [c],
          }
          return (
            <span key={`bookmark-caption-${i}`}>
              <NParagraph paragraph={captionParagraph} />
            </span>
          )
        })
      ) : (
        <span>{bookmark.url}</span>
      )}
    </Linker>
  )
}
