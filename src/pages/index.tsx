import React, { FunctionComponent, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import queryString, { ParsedQuery } from 'query-string'
import Template from '@components/common/Template'
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
  }
}

// SCSS를 Emotion styled로 변환 (블루 테마 적용)
const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const CardContainer = styled.div`
  --blue-border-color: #007bff; // Main blue color
  --blue-light-color: oklch(
    from var(--blue-border-color) l c h / 0.8
  ); // Lighter variant
  --blue-dark-color: rgba(255, 255, 255, 0.1);

  --gradient-color: oklch(
    from var(--blue-border-color) 0.3 calc(c / 2) h / 0.2
  ); // Gradient for background
  --color-neutral-900: oklch(0.185 0 0); // Neutral dark background
  --color-text: oklch(0.1 0 0); // Light text color
  --color-description: rgba(255, 255, 255, 0.5); // Semi-transparent description

  position: relative;
  width: 90%;
  height: 500px;
  padding: 2px;
  margin-top: 20px;
  border-radius: 24px;
  background: linear-gradient(
    -30deg,
    transparent,
    var(--gradient-color),
    transparent
  );
  border: 1px solid rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 8px rgba(var(--blue-border-color), 0.6);
  color: var(--color-text);
`

const ContentContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  overflow: hidden;
`

const ContentTop = styled.div`
  display: flex;
  flex-direction: column;
  padding: 48px;
  padding-bottom: 16px;
  height: 100%;
`

const ContentBottom = styled.div`
  display: flex;
  flex-direction: column;
  padding: 48px;
  padding-top: 16px;
`

const Title = styled.p`
  font-size: 36px;
  font-weight: 500;
  //margin-top: auto;
`

const Description = styled.p`
  opacity: 0.5;
`

const Divider = styled.hr`
  margin-top: auto;
  border: none;
  height: 1px;
  background-color: currentColor;
  opacity: 0.1;
  mask-image: linear-gradient(to right, transparent, black, transparent);
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black,
    transparent
  );
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
        <MainContainer className="main-container">
          <CardContainer className="card-container">
            <ContentContainer className="content-container">
              <ContentTop className="content-top">
                <Title className="title">
                  Hi, I'm SilverMi — <br /> a frontend developer focused on GIS
                  and HD-map development.
                </Title>
              </ContentTop>
              <Divider className="divider" />
              <ContentBottom className="content-bottom">
                <Description className="description">
                  Thank You for Visiting My Blog 💘 📧 pomvvv@gmail.com
                </Description>
              </ContentBottom>
            </ContentContainer>
          </CardContainer>
        </MainContainer>
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
