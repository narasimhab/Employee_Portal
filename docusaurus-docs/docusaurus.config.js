// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'CorpLink — Employee Portal',
  tagline: 'Full-stack employee management built with React, Node.js, and MySQL.',
  favicon: 'img/favicon.ico',

  url: 'https://your-domain.example',
  baseUrl: '/',

  organizationName: 'your-org',
  projectName: 'employee-portal',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl:
            'https://github.com/your-org/employee-portal/tree/main/docusaurus-docs/',
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.png',
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'CorpLink Docs',
        logo: {
          alt: 'CorpLink Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'guidesSidebar',
            position: 'left',
            label: 'Guides',
          },
          {
            type: 'docSidebar',
            sidebarId: 'apiSidebar',
            position: 'left',
            label: 'API Reference',
          },
          {
            href: 'https://github.com/',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              { label: 'Installation', to: '/docs/getting-started/installation' },
              { label: 'Architecture', to: '/docs/architecture/overview' },
              { label: 'API Reference', to: '/docs/api-reference/introduction' },
            ],
          },
          {
            title: 'Project',
            items: [
              { label: 'GitHub', href: 'https://github.com/' },
              { label: 'README', href: 'https://github.com/' },
            ],
          },
          {
            title: 'Alternative Docs',
            items: [
              { label: 'Mintlify version', href: '../docs/' },
              { label: 'VitePress version', href: '../vitepress-docs/' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} CorpLink. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'json', 'sql', 'jsx'],
      },
      mermaid: {
        theme: { light: 'default', dark: 'dark' },
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: false,
        },
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
    }),
};

export default config;
