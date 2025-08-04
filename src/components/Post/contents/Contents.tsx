import * as React from 'react'

import './Contents.scss'
import ContentBlockRender from '@components/post/contents/blockRender/ContentBlockRender'

import { BlockType, NotionChildrenType } from '@appTypes'

interface ContentsProps {
  childrens: NotionChildrenType[]
}

export default function Contents({ childrens = [] }: ContentsProps) {
  let numberedList: NotionChildrenType[] = []
  let bulletedList: NotionChildrenType[] = []
  return childrens.map((block, i) => {
    // Type number list : 항목별 별도의 block으로 나뉘어져 응답이 와서 별도 처리로 합쳐준다.
    if (block.type === BlockType.NUMBERED_LIST_ITEM) {
      numberedList.push(block)

      // 다음 block이 numbered_list가 아닐 경우 렌더링.
      if (
        numberedList?.length &&
        childrens[Math.min(i + 1, childrens.length)]?.type !==
          BlockType.NUMBERED_LIST_ITEM
      ) {
        const renderList = numberedList
        numberedList = []
        return (
          <ol key={i} className={`block-number-list`}>
            {renderList?.map((item, i) => {
              return (
                <li key={`number-list-${i}`}>
                  <ContentBlockRender block={item} />
                </li>
              )
            })}
          </ol>
        )
      } else {
        return
      }
    }

    // Type bullet list : 항목별 별도의 block으로 나뉘어져 응답이 와서 별도 처리로 합쳐준다.
    if (block.type === BlockType.BULLETED_LIST_ITEM) {
      bulletedList.push(block)
      // 다음 block이 numbered_list가 아닐 경우 렌더링.
      if (
        bulletedList?.length &&
        childrens[Math.min(i + 1, childrens.length)]?.type !==
          BlockType.BULLETED_LIST_ITEM
      ) {
        const renderList = bulletedList
        bulletedList = []
        return (
          <ul key={i} className={`block-bulleted-list`}>
            {renderList?.map((item, i) => {
              return (
                <li
                  key={`bulleted-list-${item.id}`}
                  className={`bulleted-list-${i}`}
                >
                  <ContentBlockRender block={item} />
                </li>
              )
            })}
          </ul>
        )
      } else {
        return
      }
    }

    return <ContentBlockRender key={block.id} block={block} />
  })
}
