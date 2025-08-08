import React, { FunctionComponent, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import CategoryList, { CategoryListProps } from '@components/main/CategoryList'
import Introduction from '@components/main/Introduction'
import PostList from '@components/main/PostList'
import { graphql } from 'gatsby'
import { PostListItemType } from '@appTypes/postItem.type'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import queryString, { ParsedQuery } from 'query-string'
import Template from '@components/common/Template'
import { LatestPost } from '@components/post/latest'
import { MainLayout } from '@layout/main'

import '@scss/global.scss'

type IndexPageProps = {
  location: {
    search: string
  }
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        siteUrl: string
      }
    }
    file: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
      publicURL: string
    }
  }
}

const TabMenu = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px 0px 16px 0px;

  span {
    margin: 0 8px;
    cursor: pointer;
    font-weight: bold;

    &.active {
      text-decoration: underline;
    }
  }
`

const IndexPage: FunctionComponent<IndexPageProps> = function ({
  location: { search },
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
    file: {
      childImageSharp: { gatsbyImageData },
      publicURL,
    },
  },
}) {
  const [activeTab, setActiveTab] = useState<'about' | 'post'>('about')

  const parsed: ParsedQuery<string> = queryString.parse(search)
  const selectedCategory: string =
    typeof parsed.category !== 'string' || !parsed.category
      ? 'All'
      : parsed.category

  return (
    <MainLayout className="index-layout">
      <Template
        title={title}
        description={description}
        url={siteUrl}
        image={publicURL}
      >
        <TabMenu>
          <span
            className={activeTab === 'about' ? 'active' : ''}
            onClick={() => setActiveTab('about')}
          >
            about
          </span>
          <span
            className={activeTab === 'post' ? 'active' : ''}
            onClick={() => setActiveTab('post')}
          >
            post
          </span>
        </TabMenu>

        {activeTab === 'about' && (
          <>
            <Introduction profileImage={gatsbyImageData} />
            <LatestPost />
          </>
        )}
        {activeTab === 'post' && <></>}
      </Template>
    </MainLayout>
  )
}

export default IndexPage

export const getPostList = graphql`
  query getPostList {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    file(name: { eq: "profile" }) {
      childImageSharp {
        gatsbyImageData(width: 120, height: 120)
      }
      publicURL
    }
  }
`
