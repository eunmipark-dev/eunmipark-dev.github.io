import { HeadFC, PageProps } from 'gatsby'

import * as React from 'react'

// import '@scss/global.scss'
// import '@scss/pages/PostPage.scss'
import SEO from '@components/header/SEO'
import { useNotion } from '@hooks/useNotion'
import { getPlainTextByRichText, notionNodeToJson } from '@utils/notion.util'
import { BlockType, ImageChildren } from '@appTypes/notion.type'
import {
  Contents,
  //   Feedback,
  //   LastEditedCaution,
  //   OutLink,
  //   Share,
  //   TableOfContents,
  Title,
  //   TitleDescription,
} from '@components/post'
// import { Giscus } from '@components/post/giscus';
// import { FloatBox } from '@components/ui';
// import Breadcrumb, {
//   BreadcrumbStep,
// } from '@components/ui/breadcrumb/Breadcrumb'
// import { useWeezipNotion } from '@hooks/useWeezipNotion';
//import { MainLayout } from '@layout/main'
// import { NAMES } from '@src/constants';
// import { getPlainTextByRichText, notionNodeToJson } from '@utils/notion';
import { paths } from '@utils/url.util'

//import { FloatBox } from '@components/ui'

// import { BlockType, ImageChildren, ParagraphChildren } from '@appTypes';

export const Head: HeadFC = ({ pageContext }: any) => {
  const { getNodeByUrl } = useNotion()
  const node = notionNodeToJson(getNodeByUrl(pageContext.slug))
  const title = getPlainTextByRichText(node?.properties?.remark?.rich_text)
  const series = node?.properties?.series?.select?.name
  const tagNames = node?.properties.tag?.multi_select?.map(t => t.name) || []

  const imageBlock: ImageChildren = node?.children?.find(
    c => c.type === BlockType.IMAGE,
  ) as ImageChildren
  const thumbnailUrl = imageBlock?.image
    ? `https://treefeely.notion.site/image/${encodeURIComponent(imageBlock.image?.file.url)}?table=block&id=${
        imageBlock.id
      }&cache=v2&width=1200`
    : ''

  const descriptions = []
  descriptions.push('저자: Milot')

  if (node?.properties?.created_date) {
    descriptions.push(`작성일: ${node?.properties?.created_date?.date.start}`)
  }
  if (node?.properties?.edited_date) {
    descriptions.push(`수정일: ${node?.properties?.edited_date?.date.start}`)
  }

  /*const getDescriptionText = (header2Name: '한줄평' | '머리말') => {
    const h2PrefaceIndex = node?.children?.findIndex(
      c => c.type === 'heading_2' && c.heading_2?.rich_text[0]?.plain_text === header2Name
    );

    if (0 <= h2PrefaceIndex && h2PrefaceIndex + 1 < node.children.length) {
      const h2Preface = node?.children[h2PrefaceIndex + 1];
      if (h2Preface?.type === BlockType.PARAGRAPH) {
        return `${header2Name}: ${h2Preface.paragraph.rich_text[0]?.plain_text}`;
      }
    } else {
      const firstParagraph = node?.children?.find(
        c => c.type === BlockType.PARAGRAPH && c.paragraph.rich_text.length
      ) as ParagraphChildren;
      return `${firstParagraph?.paragraph?.rich_text[0]?.plain_text || ''}`;
    }
  };

  switch (series) {
    case NAMES.TREEPEDIA:
      descriptions.push(getDescriptionText('한줄평'));
      break;
    default:
      descriptions.push(getDescriptionText('머리말'));
      break;
  }*/

  return (
    <SEO
      description={descriptions.join(', ')}
      keywords={[node?.properties?.series?.select?.name ?? '', ...tagNames]}
      pathname={pageContext.slug}
      thumbnail={thumbnailUrl}
      title={title}
    />
  )
}

const PostPage: React.FC<PageProps> = ({ pageContext }: any) => {
  const { slug } = pageContext
  const { getNodeByUrl } = useNotion()
  const node = notionNodeToJson(getNodeByUrl(slug))
  const title = getPlainTextByRichText(node?.properties?.remark?.rich_text)
  const series = node?.properties?.series?.select

  //   const breadcrumbSteps: BreadcrumbStep[] = [
  //     { name: '홈', url: paths.home() },
  //     { name: '글 목록', url: paths.posts() },
  //   ]
  //   if (series) {
  //     breadcrumbSteps.push({
  //       name: `${series.name}`,
  //       url: paths.posts({ series: series?.name }),
  //     })
  //   }

  return (
    <div className="post">
      {/* <Breadcrumb steps={breadcrumbSteps} /> */}
      <article>
        <Title slug={slug} title={title} />
        {/* <TitleDescription
          createdDate={node?.properties?.created_date}
          editedDate={node?.properties?.edited_date}
          tag={node?.properties?.tag?.multi_select}
          useTagLink
        />
        { <LastEditedCaution
          lastEditedDate={new Date(node?.properties?.edited_date?.date?.start)}
        />
        <TableOfContents target={['h1', 'h2', 'h3']} /> */}
        <div className="contents-box">
          {node?.children && <Contents childrens={node.children} />}
        </div>
        {/* } */}
      </article>
      <section className="post__footer"></section>
      {/* <FloatBox useTop /> */}
    </div>
  )
}

export default PostPage
