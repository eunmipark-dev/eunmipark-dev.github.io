import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import queryString, { ParsedQuery } from 'query-string'
import Template from '@components/common/Template'
import { MainLayout } from '@layout/main'
import '@scss/global.scss'
import { aboutData } from '@data/about_data'
import SectionComponent from '@components/main/SectionComponent'
import SkillsContent from '@components/main/SkillsContent'
import CompaniesContent from '@components/main/CompaniesContent'

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
  }
}

const Container = styled.div`
  padding: 40px 20px;
  background-color: #f9f9f9;
  color: #333;
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Inter', sans-serif;
`

const Intro = styled.div`
  text-align: center;
  margin-bottom: 40px;
  font-size: 1.2rem;
  color: #555;
`

const IndexPage: FunctionComponent<IndexPageProps> = function ({
  location: { search },
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
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
      <Template title={title} description={description} url={siteUrl}>
        <Container>
          <Intro>
            Hi, I'm Eunmi Park. I'm developing a map-based data visualization.
          </Intro>
          <SectionComponent title="Skills">
            <SkillsContent skills={aboutData.skills} />
          </SectionComponent>
          <SectionComponent title="Companies">
            <CompaniesContent companies={aboutData.companies} />
          </SectionComponent>
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
  }
`
