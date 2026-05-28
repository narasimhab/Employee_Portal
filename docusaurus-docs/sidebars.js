// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  guidesSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/installation',
        'getting-started/quickstart',
        'getting-started/demo-credentials',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      collapsed: false,
      items: [
        'architecture/overview',
        'architecture/tech-stack',
        'architecture/project-structure',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      collapsed: false,
      items: [
        'features/dashboard',
        'features/directory',
        'features/announcements',
        'features/assets',
        'features/leave',
        'features/timesheet',
        'features/performance',
        'features/projects',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      collapsed: false,
      items: [
        'development/environment-variables',
        'development/database',
        'development/roles-and-permissions',
      ],
    },
    {
      type: 'category',
      label: 'Phase Guides',
      collapsed: true,
      items: [
        'phase-guides/phase-1-setup',
        'phase-guides/phase-2-authentication',
      ],
    },
  ],

  apiSidebar: [
    {
      type: 'category',
      label: 'Overview',
      collapsed: false,
      items: ['api-reference/introduction'],
    },
    {
      type: 'category',
      label: 'Endpoints',
      collapsed: false,
      items: [
        'api-reference/health',
        'api-reference/auth',
        'api-reference/dashboard',
      ],
    },
  ],
};

export default sidebars;
