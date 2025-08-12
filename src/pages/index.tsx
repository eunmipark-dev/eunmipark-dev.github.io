import React, { FunctionComponent, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import { PostListItemType } from '@appTypes/postItem.type'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import queryString, { ParsedQuery } from 'query-string'
import Template from '@components/common/Template'
import { LatestPost } from '@components/post/latest'
import { MainLayout } from '@layout/main'
import '@scss/global.scss'
import { aboutData } from '@data/about_data'
import SkillsSection from '@components/main/SkillsSection'
import ProjectsSection from '@components/main/ProjectsSection'
import PhotosSection from '@components/main/PhotosSection'
import CompanySection from '@components/main/CompanySection' // 새 컴포넌트

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

const Container = styled.div`
  padding: 20px;
  background-color: #f0f4f8; /* Redis 느낌의 부드러운 배경 */
  color: #333;
`

const Section = styled.section`
  margin-bottom: 40px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Redis 스타일 그림자 */
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
        <Container>
          <Section>
            <PhotosSection imageData={gatsbyImageData} />
          </Section>
          <Section>
            <SkillsSection skills={aboutData.skills} />
          </Section>
          <Section>
            <CompanySection companies={aboutData.companies} />
          </Section>
          <Section>
            <ProjectsSection projects={aboutData.projects} />
          </Section>
          <Section>
            <LatestPost />
          </Section>
        </Container>
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
