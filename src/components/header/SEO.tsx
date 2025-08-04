import * as React from 'react';

import { useSiteMetadata } from '@hooks/useSiteMetadata';
import { NAMES } from '@src/constants';

interface SEOProps {
  title?: string;
  description?: string;
  pathname?: string;
  thumbnail?: string;
  children?: React.ReactNode;
  keywords?: string[];
}

const SEO = ({ title, description, pathname, thumbnail, children, keywords = [] }: SEOProps) => {
  const { title: defaultTitle, description: defaultDescription, siteUrl } = useSiteMetadata();

  const seo = {
    title: `${title ? `${title} | ` : ``}${defaultTitle}`,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ``}`,
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta content="index,follow" name="robots" />
      <meta content="kr" name="content-language" />
      <meta content={seo.description} name="description" />
      <meta content={['treefeely', 'weezip', ...keywords]?.join(', ')} name="keywords" />

      <meta content={'website'} property="og:type" />
      <meta content={seo.title} property="og:title" />
      <meta content={seo.description} property="og:description" />
      <meta content={seo.url} property="og:url" />
      <meta content={NAMES.SITE} property="og:site_name" />
      <meta content={'ko_KR'} property="og:locale" />

      <meta content="summary_large_image" property="twitter:card" />
      <meta content={seo.title} property="twitter:title" />
      <meta content={seo.description} property="twitter:description" />
      <meta content={seo.url} property="twitter:url" />

      {/* <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>👤</text></svg>"
      /> */}

      {thumbnail && (
        <>
          <meta content={thumbnail} name="image" />
          <meta content={thumbnail} property="og:image" />
          <meta content={'1200'} property="og:image:width" />
          <meta content={thumbnail} property="twitter:image" />
        </>
      )}
      {children}
    </>
  );
};

export default SEO;
