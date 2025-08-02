/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */

require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Eunmi's Blog`,
    description: `Eunmi's Blog`,
    author: `Eunmi`,
    siteUrl: 'https://eunmipark-dev.github.io/', // 배포 후 변경 예정
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@components': 'src/components',
          '@layout': 'src/layout',
          '@module': 'src/module',
          '@pages': 'src/pages',
          '@scss': 'src/scss',
          '@store': 'src/store',
          '@hooks': 'src/hooks',
          '@types': 'src/types',
          '@utils': 'src/utils',
          '@images': 'src/images',
          '@src': 'src',
        },
        extensions: ['js', 'jsx', 'ts', 'tsx'],
      },
    },
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contents`,
        path: `${__dirname}/contents`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static`,
      },
    },
    `gatsby-plugin-emotion`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: ['auto', 'webp'],
          quality: 100,
          placeholder: 'blurred',
        },
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-smartypants',
            options: {
              dashes: 'oldschool',
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 768,
              quality: 100,
              withWebp: true,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {},
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://eunmipark-dev.github.io/',
        stripQueryString: true,
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: `gatsby-source-notion-feely`,
      options: {
        token: process.env.GATSBY_INTEGRATION_TOKEN,
        databases: [
          {
            id: process.env.GATSBY_DATABASE_ID,
            name: `milot`,
          },
        ],
      },
    },
  ],
}
