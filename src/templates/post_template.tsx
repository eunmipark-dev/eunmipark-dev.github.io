import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'
import { Global, css } from '@emotion/react'
import styled from '@emotion/styled'

type InfoPageProps = {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: string
      }
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

const TextStyle = css`
  font-size: 18px;
  font-weight: 700;
  color: gray;
`

const Text1 = styled.div`
  font-size: 20px;
  font-weight: 700;
`

const InfoPage: FunctionComponent<InfoPageProps> = function ({
  data: {
    site: {
      siteMetadata: { title, description, author },
    },
  },
}) {
  return (
    <div>
      <Global styles={globalStyle} />
      <Text1>{description}</Text1>
      {description} {author}
    </div>
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
  }
`

// import React, { FunctionComponent } from 'react'
// import { graphql } from 'gatsby'
// import { PostPageItemType } from '@appTypes/postItem.type' // 바로 아래에서 정의할 것입니다
// import Template from '@components/common/Template'
// import PostHead from '@components/post/PostHead'
// import PostContent from '@components/post/PostContent'

// type PostTemplateProps = {
//   data: {
//     allMarkdownRemark: {
//       edges: PostPageItemType[]
//     }
//   }
//   location: {
//     href: string
//   }
// }
// const PostTemplate: FunctionComponent<PostTemplateProps> = function ({
//   data: {
//     allMarkdownRemark: { edges },
//   },
//   location: { href },
// }) {
//   const {
//     node: {
//       html,
//       frontmatter: {
//         title,
//         summary,
//         date,
//         categories,
//         thumbnail: {
//           childImageSharp: { gatsbyImageData },
//           publicURL,
//         },
//       },
//     },
//   } = edges[0]

//   return (
//     <Template title={title} description={summary} url={href} image={publicURL}>
//       <PostHead
//         title={title}
//         date={date}
//         categories={categories}
//         thumbnail={gatsbyImageData}
//       />
//       <PostContent html={html} />
//     </Template>
//   )
// }

// export default PostTemplate

// export const queryMarkdownDataBySlug = graphql`
//   query queryMarkdownDataBySlug($slug: String) {
//     allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
//       edges {
//         node {
//           html
//           frontmatter {
//             title
//             summary
//             date(formatString: "YYYY.MM.DD.")
//             categories
//             thumbnail {
//               childImageSharp {
//                 gatsbyImageData
//               }
//               publicURL
//             }
//           }
//         }
//       }
//     }
//   }
// `
