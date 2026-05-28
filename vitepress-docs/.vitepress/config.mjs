import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    title: 'CorpLink — Employee Portal',
    description:
      'Comprehensive employee management portal built with React, Node.js, and MySQL.',
    cleanUrls: true,
    lastUpdated: true,

    head: [
      ['meta', { name: 'theme-color', content: '#0D9373' }],
      ['link', { rel: 'icon', href: '/favicon.svg' }]
    ],

    themeConfig: {
      logo: { src: '/logo.svg', width: 24, height: 24 },
      siteTitle: 'CorpLink Docs',

      nav: [
        { text: 'Guides', link: '/getting-started/installation', activeMatch: '^/(?!api-reference)' },
        { text: 'API Reference', link: '/api-reference/introduction', activeMatch: '/api-reference/' },
        {
          text: 'Resources',
          items: [
            { text: 'Project README', link: 'https://github.com/' },
            { text: 'Mintlify Docs', link: '../docs/' }
          ]
        }
      ],

      sidebar: {
        '/getting-started/': sidebarGuides(),
        '/architecture/': sidebarGuides(),
        '/features/': sidebarGuides(),
        '/development/': sidebarGuides(),
        '/phase-guides/': sidebarGuides(),
        '/api-reference/': sidebarApi()
      },

      socialLinks: [{ icon: 'github', link: 'https://github.com/' }],

      footer: {
        message: 'Built with VitePress',
        copyright: 'Copyright © 2024 CorpLink'
      },

      search: { provider: 'local' },

      editLink: {
        pattern:
          'https://github.com/your-org/employee-portal/edit/main/vitepress-docs/:path',
        text: 'Edit this page on GitHub'
      },

      outline: { level: [2, 3], label: 'On this page' }
    },

    mermaid: {
      theme: 'default'
    }
  })
)

function sidebarGuides() {
  return [
    {
      text: 'Getting Started',
      collapsed: false,
      items: [
        { text: 'Welcome', link: '/' },
        { text: 'Installation', link: '/getting-started/installation' },
        { text: 'Quickstart', link: '/getting-started/quickstart' },
        { text: 'Demo Credentials', link: '/getting-started/demo-credentials' }
      ]
    },
    {
      text: 'Architecture',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/architecture/overview' },
        { text: 'Tech Stack', link: '/architecture/tech-stack' },
        { text: 'Project Structure', link: '/architecture/project-structure' }
      ]
    },
    {
      text: 'Features',
      collapsed: false,
      items: [
        { text: 'Dashboard', link: '/features/dashboard' },
        { text: 'Employee Directory', link: '/features/directory' },
        { text: 'Announcements', link: '/features/announcements' },
        { text: 'Assets', link: '/features/assets' },
        { text: 'Leave Management', link: '/features/leave' },
        { text: 'Timesheet', link: '/features/timesheet' },
        { text: 'Performance Reviews', link: '/features/performance' },
        { text: 'Projects', link: '/features/projects' }
      ]
    },
    {
      text: 'Development',
      collapsed: false,
      items: [
        { text: 'Environment Variables', link: '/development/environment-variables' },
        { text: 'Database', link: '/development/database' },
        { text: 'Roles & Permissions', link: '/development/roles-and-permissions' }
      ]
    },
    {
      text: 'Phase Guides',
      collapsed: true,
      items: [
        { text: 'Phase 1 — Setup', link: '/phase-guides/phase-1-setup' },
        { text: 'Phase 2 — Authentication', link: '/phase-guides/phase-2-authentication' }
      ]
    }
  ]
}

function sidebarApi() {
  return [
    {
      text: 'Overview',
      collapsed: false,
      items: [{ text: 'Introduction', link: '/api-reference/introduction' }]
    },
    {
      text: 'Endpoints',
      collapsed: false,
      items: [
        { text: 'Health', link: '/api-reference/health' },
        { text: 'Authentication', link: '/api-reference/auth' },
        { text: 'Dashboard', link: '/api-reference/dashboard' }
      ]
    }
  ]
}
