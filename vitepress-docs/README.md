# VitePress Documentation

Live documentation for the CorpLink Employee Portal, built with [VitePress](https://vitepress.dev).

This is a **VitePress mirror** of the Mintlify docs in `../docs/`. Pick whichever you prefer — both render the same content.

## Local Preview

Install dependencies once:

```bash
cd vitepress-docs
npm install
```

Then run the dev server:

```bash
npm run docs:dev
```

The site opens at **http://localhost:5173** with hot reload as you edit `.md` files.

## Build & Preview Production

```bash
npm run docs:build      # outputs to .vitepress/dist
npm run docs:preview    # serves the built site locally
```

## Adding a Page

1. Create a new `.md` file under the appropriate folder (e.g. `features/my-new-feature.md`).
2. Add a frontmatter block at the top:

   ```md
   ---
   title: My New Feature
   description: What it does in one sentence.
   ---

   # My New Feature
   ```

3. Register the page in `.vitepress/config.mjs` under the right sidebar group.
4. Save — `npm run docs:dev` hot-reloads instantly.

## VitePress Features Used

### Custom Containers (the equivalent of Mintlify callouts)

```md
::: tip
This is a tip.
:::

::: info
Useful background info.
:::

::: warning
Heads up!
:::

::: danger
Critical warning.
:::

::: details Click to expand
Hidden content here.
:::
```

### Code Groups (multi-tab code blocks)

````md
::: code-group

```bash [npm]
npm install
```

```bash [yarn]
yarn install
```

:::
````

### Mermaid Diagrams

Powered by `vitepress-plugin-mermaid`. Just use a fenced code block with the `mermaid` language:

````md
```mermaid
flowchart LR
  A --> B
```
````

### Frontmatter

Every page can set its `title`, `description`, and other metadata. The landing page uses `layout: home` for the hero + features layout.

## Deploying

VitePress outputs static HTML, so it deploys anywhere:

| Host | Notes |
|------|-------|
| **GitHub Pages** | Build in CI, push `.vitepress/dist` to `gh-pages` branch. |
| **Vercel / Netlify** | Build command `npm run docs:build`, publish dir `.vitepress/dist`. |
| **Cloudflare Pages** | Same as Vercel/Netlify. |
| **S3 + CloudFront** | Upload `.vitepress/dist` and set CloudFront origin. |

See the [official deployment guide](https://vitepress.dev/guide/deploy) for full steps.

## Structure

```
vitepress-docs/
├── .vitepress/
│   ├── config.mjs            # Theme, nav, sidebar, mermaid plugin
│   └── cache/                # (auto, gitignored)
├── index.md                  # Landing page (home layout)
├── getting-started/
├── architecture/
├── features/
├── development/
├── api-reference/
├── phase-guides/
├── package.json
├── .gitignore
└── README.md                 # This file
```

## Why VitePress Instead of Mintlify?

| | VitePress | Mintlify |
|---|-----------|----------|
| **Hosting** | Self-host anywhere | Mintlify Cloud (free + paid tiers) |
| **Stack** | Vue 3 + Vite | Closed-source SaaS |
| **Markdown** | Standard `.md` + custom containers | `.mdx` with React components |
| **Pricing** | Free, open-source | Free tier + paid for custom domains/branding |
| **Customization** | Full Vue component access | Limited to provided components |
| **Search** | Built-in local search | Algolia (or paid Mintlify search) |

The CorpLink repo ships **both** so you can A/B them and keep whichever feels right.
