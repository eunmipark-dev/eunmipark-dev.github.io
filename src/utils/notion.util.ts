import { convertDatetimeFormat } from './converter.util'

import {
  NotionChildrenType,
  MultiSelect,
  NotionColumn,
  NotionNode,
  RichText,
} from '@appTypes/notion.type'

export const notionNodeToJson = (
  node: NotionNode | undefined,
): NotionChildrenType | undefined => {
  return node ? JSON.parse(node?.json) : undefined
}

export const parseNotionColumn = (
  content: NotionChildrenType,
): NotionColumn => {
  const { id, URL, remark, created_date, edited_date, series, tag } =
    content.properties

  return {
    id: id.unique_id.number || -1,
    remark: getPlainTextByRichText(remark.rich_text),
    lastEditedTime: convertDatetimeFormat(edited_date.date.start || ''),
    createdTime: convertDatetimeFormat(created_date.date.start || ''),
    notionUrl: URL.url || '',
    tag: tag.multi_select || [],
    series: series.select,
  }
}

export const classifyPost = (
  nodes: NotionNode[],
): {
  everyPostsTags: string[]
  everyPostsSeries: string[]
} => {
  const postTagSet = new Set<string>()
  const postSeriesSet = new Set<string>()

  nodes.map(node => {
    if (node?.title?.toUpperCase()?.includes('POST')) {
      const json = notionNodeToJson(node)
      if (!node.title.startsWith('/post') || !json) return

      json.properties?.tag?.multi_select?.map(v => {
        postTagSet.add(v.name)
      })

      if (json.properties?.series?.select) {
        postSeriesSet.add(json.properties?.series?.select.name)
      }
    }
  })

  return {
    everyPostsTags: Array.from(postTagSet),
    everyPostsSeries: Array.from(postSeriesSet),
  }
}

export const getPlainTextByRichText = (richText?: RichText): string => {
  return richText?.reduce((str, cur) => (str += cur.plain_text), '') || ''
}
