# Docusaurus Documentation

Live documentation for the CorpLink Employee Portal, built with [Docusaurus 3](https://docusaurus.io).

This is a **Docusaurus mirror** of the Mintlify docs (`../docs/`) and VitePress docs (`../vitepress-docs/`). All three render the same content — pick whichever you prefer.

## Local Preview

Install dependencies once:

```bash
cd docusaurus-docs
npm install
```

Then run the dev server:

```bash
npm start
```

The site opens at **http://localhost:3000** with hot reload as you edit `.md` / `.mdx` files.

## Build & Serve Production

```bash
npm run build      # outputs static HTML to build/
npm run serve      # serves the built site locally
```

## Adding a Page

1. Create a new `.md` (or `.mdx` if you need React components) under the appropriate folder, e.g. `docs/features/my-new-feature.md`.
2. Add a frontmatter block at the top:

   ```md
   ---
   sidebar_position: 9
   title: My New Feature
   description: What it does in one sentence.
   ---

   # My New Feature
   ```

3. Register the page in `sidebars.js` under the right category.
4. Save — the dev server hot-reloads instantly.

## Docusaurus Features Used

### Admonitions (callouts)

```md
:::note
A general note.
:::

:::tip
A helpful tip.
:::

:::info
Background info.
:::

:::warning
Heads up!
:::

:::danger
Critical warning.
:::
```

### Tabs (requires `.mdx`)

```mdx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>
    ```bash
    npm install
    ```
  </TabItem>
  <TabItem value="yarn" label="yarn">
    ```bash
    yarn install
    ```
  </TabItem>
</Tabs>
```

### Mermaid Diagrams

Powered by `@docusaurus/theme-mermaid` (already wired in `docusaurus.config.js`). Just use a fenced code block:

````md
```mermaid
flowchart LR
  A --> B
```
````

### Collapsible Sections

Standard HTML `<details>` works inside markdown:

```md
<details>
<summary>Click to expand</summary>

Hidden content here.

</details>
```

## Project Structure

```
docusaurus-docs/
├── docusaurus.config.js          # Main config (theme, navbar, footer, plugins)
├── sidebars.js                   # Sidebar definitions (guidesSidebar, apiSidebar)
├── babel.config.js
├── package.json
├── .gitignore
├── README.md
│
├── docs/                         # All documentation pages
│   ├── intro.md                  # Landing route inside docs (/)
│   ├── getting-started/
│   │   ├── installation.mdx
│   │   ├── quickstart.md
│   │   └── demo-credentials.mdx
│   ├── architecture/
│   │   ├── overview.md           # with Mermaid
│   │   ├── tech-stack.md
│   │   └── project-structure.md
│   ├── features/                 # 8 module pages
│   ├── development/              # env-vars, database, roles
│   ├── api-reference/            # 4 endpoint pages
│   └── phase-guides/             # 2 phase summaries
│
├── src/
│   ├── pages/
│   │   ├── index.js              # Custom homepage (React)
│   │   └── index.module.css
│   ├── components/
│   │   └── HomepageFeatures/
│   │       ├── index.js          # Feature card grid
│   │       └── styles.module.css
│   └── css/
│       └── custom.css            # Brand colors (#0D9373 primary)
│
└── static/                       # Static assets (images, favicon)
```

## Two-Sidebar Navigation

The site uses two separate sidebars wired up in `sidebars.js`:

- **`guidesSidebar`** — Getting Started, Architecture, Features, Development, Phase Guides
- **`apiSidebar`** — API Reference only

Both are exposed as separate navbar tabs via `type: 'docSidebar'` entries in `docusaurus.config.js`. Visitors see one sidebar at a time depending on which tab they're in.

## Deploying

Docusaurus builds static HTML, so it deploys anywhere:

| Host | Notes |
|------|-------|
| **GitHub Pages** | `npm run deploy` (configure `organizationName` + `projectName` first) |
| **Vercel / Netlify** | Build command `npm run build`, publish dir `build/` |
| **Cloudflare Pages** | Same as Vercel/Netlify |
| **S3 + CloudFront** | Upload `build/` and set CloudFront origin |
| **Docker / nginx** | Copy `build/` into an nginx image |

See the [official deployment guide](https://docusaurus.io/docs/deployment) for full steps.

## Comparison with the Other Doc Sites

| | Docusaurus | Mintlify | VitePress |
|---|------------|----------|-----------|
| **Hosting** | Self-host anywhere | Mintlify Cloud (free + paid) | Self-host anywhere |
| **Stack** | React + MDX | Closed-source SaaS | Vue + Vite |
| **File format** | `.md` + `.mdx` | `.mdx` only | `.md` |
| **Components** | Full React access | Mintlify-provided | Custom containers + Vue components |
| **Search** | Built-in local + Algolia | Algolia (or paid) | Built-in local + Algolia |
| **Versioning** | First-class (built-in) | Branch-based | Manual |
| **i18n** | First-class (built-in) | Built-in | Built-in |
| **Build time** | Slower (full Webpack) | N/A (hosted) | Fast (Vite) |

**Pick Docusaurus when** you need versioning, i18n, plugins, or want maximum React flexibility.
**Pick VitePress when** you want the fastest dev loop and a lighter footprint.
**Pick Mintlify when** you want a beautiful site with zero infra and don't mind a hosted SaaS.

The CorpLink repo ships **all three** so you can A/B them and keep whichever fits your team.
