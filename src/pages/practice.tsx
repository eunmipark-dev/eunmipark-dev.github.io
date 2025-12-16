import React, { FunctionComponent, useState, useMemo } from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'
import { Global, css } from '@emotion/react'
import styled from '@emotion/styled'
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image' // GatsbyImage와 getImage 추가
import { MainLayout } from '@layout/main'

type InfoPageProps = {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: string
      }
    }
    allFile: {
      edges: Array<{
        node: {
          base: string
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData
          }
        }
      }>
    }
  }
}

const globalStyle = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-size: 20px;
  }
`

// 정적 포스트 리스트 데이터 (별도 파일로 분리 가능, e.g., practicePosts.ts 임포트)
const practicePosts = [
  {
    id: 1,
    title: '첫 번째 포스트',
    series: '이득우의 게임수학',
    image: 'practice_01.png', // 파일명만 (GraphQL에서 base로 매칭, 원본 '../images/practice/practice_01.png' -> 'practice_01.png')
    link: '/practice/1', // 클릭 시 열릴 페이지 경로
  },
  //   {
  //     id: 2,
  //     title: '두 번째 포스트',
  //     series: '시리즈 B',
  //     image: 'practice_02.png', // 예시: 파일명으로 변경
  //     link: '/practice/2',
  //   },
  // ... 추가 포스트들 (practice_03.png 등)
]

const PracticeItem = styled.a`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 0;
  transition: all 0.3s ease;
  text-decoration: none;
  color: var(--text-color);

  &:hover {
    background-color: var(--section-bg); /* 호버 시 가벼운 배경 변화 */
    transform: translateY(-2px);
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--border-color); /* 옅은 색 보더 (중간 구분선) */
    opacity: 0.5; /* 옅게: 50% 투명도 */
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
`

const PracticeImage = styled.div`
  flex-shrink: 0;
  width: 200px;
  height: 150px;
  border-radius: 4px;
  overflow: hidden;
  background-color: var(--section-bg);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    ${PracticeItem}:hover & {
      transform: scale(1.05);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`

const PracticeText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const PostTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
  line-height: 1.4;
`

const PostSeries = styled.span`
  font-size: 1rem;
  color: var(--text-secondary);
  font-weight: 500;
`

const PracticeList = styled.div`
  max-width: 1400px;
  margin: 2rem auto;
  padding: 0 1rem;
  background-color: var(--background-color); /* 세련된 배경 */
  border-radius: 8px; /* 전체 리스트 라운드 코너 */
  overflow: hidden; /* 깔끔한 오버플로 방지 */
  box-shadow: var(--shadow); /* 가벼운 그림자 */

  @media (max-width: 768px) {
    margin: 1rem auto;
  }
`

const SeriesFilterWrapper = styled.div`
  max-width: 1400px;
  margin: 1rem auto 2rem;
  padding: 0 1rem;
  display: flex;
  flex-wrap: wrap; /* 여러 줄로 wrap */
  gap: 0.75rem; /* 라벨 간격 */

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`

const SeriesChip = styled.button<{ selected: boolean }>`
  padding: 0.5rem 1.25rem;
  border-radius: 999px; /* 동그란 라벨 (pill 형태) */
  border: 1px solid var(--border-color);
  background-color: ${({ selected }) =>
    selected ? 'var(--accent-color)' : 'var(--background-color)'};
  color: ${({ selected }) =>
    selected ? 'var(--button-text)' : 'var(--text-color)'};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--accent-color);
    color: var(--button-text);
    border-color: var(--accent-color);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--accent-color);
  }
`

const InfoPage: FunctionComponent<InfoPageProps> = function ({ data }) {
  const [selectedSeries, setSelectedSeries] = useState<string>('all') // 초기 'all'로 모든 시리즈

  // unique 시리즈 목록 추출 (메모이제이션)
  const seriesOptions = useMemo(() => {
    const uniqueSeries = Array.from(
      new Set(practicePosts.map(post => post.series)),
    )
    return ['all', ...uniqueSeries] // 'all' 옵션 추가
  }, [])

  // 필터링된 포스트 목록
  const filteredPosts = useMemo(() => {
    if (selectedSeries === 'all') return practicePosts
    return practicePosts.filter(post => post.series === selectedSeries)
  }, [selectedSeries])

  // 이미지 맵 생성 (useMemo로 최적화)
  const images = useMemo(() => {
    const imageMap: { [key: string]: IGatsbyImageData | undefined } = {}
    data.allFile.edges.forEach(({ node }) => {
      imageMap[node.base] = getImage(node.childImageSharp.gatsbyImageData)
    })
    return imageMap
  }, [data.allFile])

  return (
    <MainLayout className="posts-layout">
      <Global styles={globalStyle} />
      {/* 페이지 상단 시리즈 필터: 동그란 라벨(칩) 형태 */}
      <SeriesFilterWrapper>
        {seriesOptions.map(series => (
          <SeriesChip
            key={series}
            selected={selectedSeries === series}
            onClick={() => setSelectedSeries(series)}
          >
            {series === 'all' ? '전체' : series}
          </SeriesChip>
        ))}
      </SeriesFilterWrapper>
      <PracticeList>
        {filteredPosts.map(post => (
          <PracticeItem
            key={post.id}
            href={post.link}
            target="_blank" // 새 탭으로 열기
            rel="noopener noreferrer"
          >
            <PracticeImage>
              {images[post.image] && (
                <GatsbyImage
                  image={images[post.image]!}
                  alt={`${post.title} 썸네일`}
                  loading="lazy"
                />
              )}
            </PracticeImage>
            <PracticeText>
              <PostTitle>{post.title}</PostTitle>
              <PostSeries>{post.series}</PostSeries>
            </PracticeText>
          </PracticeItem>
        ))}
      </PracticeList>
    </MainLayout>
  )
}

export default InfoPage

export const metadataQuery = graphql`
  {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
    allFile(
      filter: {
        relativeDirectory: { eq: "images/practice" }
        extension: { regex: "/(jpg|png|jpeg)/" }
        base: { regex: "/^practice_/" }
      }
    ) {
      edges {
        node {
          base # 파일명 (e.g., 'practice_01.png')
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 200, height: 150) # 크기 지정
          }
        }
      }
    }
  }
`
