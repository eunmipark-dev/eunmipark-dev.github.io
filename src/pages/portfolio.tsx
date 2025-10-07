import React, { FunctionComponent, useEffect, useRef } from 'react'
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
import maplibregl from 'maplibre-gl' // 라이브러리 임포트
import 'maplibre-gl/dist/maplibre-gl.css' // CSS 임포트 (필수: 지도 스타일링)
import MapComponent from '@components/main/MapComponent'

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
    <div>
      <Intro>shakit</Intro>
      <MapComponent
        center={[127.0, 37.5]} // 서울 좌표
        zoom={10}
        styleUrl="https://demotiles.maplibre.org/style.json"
        height="500px" // 높이 조정 (100vh 대신 고정값으로 테스트)
      />
      <SectionComponent title="Skills">
        <SkillsContent skills={aboutData.skills} />
      </SectionComponent>
      <SectionComponent title="Companies">
        <CompaniesContent companies={aboutData.companies} />
      </SectionComponent>
    </div>
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
