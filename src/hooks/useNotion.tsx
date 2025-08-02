import { graphql, useStaticQuery } from 'gatsby'

import { useMemo } from 'react'

import {
  classifyPost,
  notionNodeToJson,
  parseNotionColumn,
} from '@utils/notion.util'

import { NotionChildrenType, NotionNode } from '@appTypes/notion.type'

export const useNotion = () => {
  const data = useStaticQuery(graphql`
    query {
      allNotion {
        edges {
          node {
            id
            databaseName
            title
            json
            createdAt
            updatedAt
          }
        }
      }
    }
  `)

  const memoized = useMemo(() => {
    console.log('data?.allNotion', data?.allNotion)
    const nodes: NotionNode[] = data?.allNotion?.edges?.map(
      ({ node }: { node: NotionNode }) => {
        return node
        /*if (node.databaseName.toUpperCase() === NAMES.SITE.toUpperCase()) {
        return node;
      }*/
      },
    )

    console.log('nodess:', nodes)

    const posts: NotionNode[] = nodes
      .filter((node: NotionNode) => node.title.startsWith('/post'))
      .map((node: NotionNode) => {
        const json = notionNodeToJson(node)
        node.notionColumn = parseNotionColumn(json as NotionChildrenType)
        return node
      })
      .sort(
        (a, b) =>
          Date.parse(b.notionColumn.createdTime) -
          Date.parse(a.notionColumn.createdTime),
      )

    const { everyPostsTags, everyPostsSeries } = classifyPost(posts)

    return {
      data,
      nodes,
      posts,
      everyPostsTags,
      everyPostsSeries,
      getNodeByUrl: (url: string) => nodes.find(node => node.title === url),
    }
  }, [data])

  return memoized
}
