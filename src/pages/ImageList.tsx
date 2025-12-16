import { HeadFC, PageProps, graphql } from 'gatsby'

import * as React from 'react'
import { useEffect, useState } from 'react'

import '@scss/global.scss'
import '@scss/pages/PostsPage.scss' // 기존 스타일 재사용 가능, 필요 시 조정

import SEO from '@components/header/SEO'
import { PostsDescription, PostsFilter, ResetDivider } from '@components/post'
import { LoadContainer } from '@components/ui'
import { useNotion } from '@hooks/useNotion'
import { MainLayout } from '@layout/main'
import { includesString } from '@utils/common.util'
import { getParamValue, paths } from '@utils/url.util'

import { NotionNode } from '@appTypes/notion.type'
import Images from '@components/post/list/Images' // 새로 추가된 Images 컴포넌트 import

export const Head: HeadFC = () => {
  return (
    <SEO
      description={`열심히 글을 작성해 봅시다.`}
      pathname={paths.posts()}
      title={`SilverMi: Post Image List`}
    >
      <link
        href={`https://eunmipark-dev.github.io${paths.posts()}`}
        rel="canonical"
      />
    </SEO>
  )
}

const ImageListPage: React.FC<PageProps> = ({ location }) => {
  const params = new URLSearchParams(location.search)
  const { posts } = useNotion()

  const series = getParamValue(params, 'series')
  const tag = getParamValue(params, 'tag')
  const keyword = getParamValue(params, 'keyword')

  const [list, setList] = useState<NotionNode[]>([])
  const [filterText, setFilterText] = useState('전체')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkFilter()
    checkFilteredList()
    setIsLoading(false)
  }, [location])

  const checkFilteredList = () => {
    let _list: NotionNode[] = []

    if (location.search) {
      _list = posts.filter(post => {
        if (series) {
          return includesString(post.notionColumn?.series?.name, series)
        } else if (tag) {
          return post.notionColumn?.tag?.find(t => includesString(t.name, tag))
        } else if (keyword) {
          return (
            includesString(post.notionColumn?.remark, keyword) ||
            post.notionColumn?.tag?.find(t =>
              includesString(t.name, keyword),
            ) ||
            includesString(post.notionColumn?.series?.name, keyword)
          )
        }
        return true
      })
    } else {
      _list = posts
    }

    setList(_list)
  }

  const checkFilter = () => {
    setFilterText(
      decodeURIComponent(series || tag || keyword)
        .replaceAll(/ /g, '')
        .toUpperCase() || '전체',
    )
  }

  return (
    <MainLayout className="posts-layout">
      <section className="posts-layout__header">
        <PostsFilter />
        <ResetDivider />
        <PostsDescription
          filteredText={filterText}
          isLoading={isLoading}
          length={list.length}
        />
      </section>
      {
        <LoadContainer isError={false} isLoading={isLoading}>
          {/* 이미지 리스트 시작 */}
          <Images list={list} />
          {/* 이미지 리스트 끝 */}
        </LoadContainer>
      }
    </MainLayout>
  )
}

export const postQuery = graphql`
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
`

export default ImageListPage
