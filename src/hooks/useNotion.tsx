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
    const nodes: NotionNode[] = data?.allNotion?.edges?.map(
      ({ node }: { node: NotionNode }) => {
        return node
        /*if (node.databaseName.toUpperCase() === NAMES.SITE.toUpperCase()) {
        return node;
      }*/
      },
    )

    const profile: NotionNode | undefined = nodes.find((node: NotionNode) =>
      node.title.startsWith('/profile'),
    )

    const processedProfile: NotionNode | undefined = profile
      ? {
          ...profile,
          notionColumn: parseNotionColumn(
            notionNodeToJson(profile) as NotionChildrenType,
          ),
        }
      : undefined

    //console.log(processedProfile?.notionColumn)
    //console.log(notionNodeToJson(profile))
    const njson = notionNodeToJson(profile)
    // for(let i=0; i<(njson?.children.length??1); i++) {
    //     console.log(njson.)
    // }

    console.log('nodes', nodes)

    const posts: NotionNode[] = nodes
      .filter((node: NotionNode) => node.title.startsWith('/post'))
      .map((node: NotionNode) => {
        console.log('node', node)
        const json = notionNodeToJson(node)
        node.notionColumn = parseNotionColumn(json as NotionChildrenType)
        return node
      })
      .sort(
        (a, b) =>
          Date.parse(b.notionColumn.createdTime) -
          Date.parse(a.notionColumn.createdTime),
      )

    console.log('post', posts)
    console.log('--------')

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
