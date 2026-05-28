# Mintlify Documentation

Live documentation for the CorpLink Employee Portal, built with [Mintlify](https://mintlify.com).

## Local Preview

Install the Mintlify CLI once globally:

```bash
npm i -g mint
```

Then from this folder:

```bash
mint dev
```

The site opens at `http://localhost:3333` with hot reload as you edit `.mdx` files.

## Adding a Page

1. Create a new `.mdx` file under the appropriate folder (e.g. `features/my-new-feature.mdx`).
2. Add a frontmatter block at the top:

   ```mdx
   ---
   title: "My New Feature"
   description: "What it does in one sentence."
   ---
   ```

3. Register the page in `docs.json` under the right navigation group.
4. Save — `mint dev` hot-reloads instantly.

## Available Mintlify Components

- `<Card>`, `<CardGroup cols={2}>`
- `<Steps>` / `<Step>`
- `<Tabs>` / `<Tab>`
- `<AccordionGroup>` / `<Accordion>`
- `<Note>`, `<Warning>`, `<Tip>`, `<Check>`, `<Info>`
- `<CodeGroup>` for multi-language tabs
- `<ParamField>` and `<ResponseField>` for API docs
- Mermaid diagrams via fenced code blocks

Full component reference: <https://mintlify.com/docs/components>

## Deploying

1. Push your changes to GitHub.
2. Sign in at <https://dashboard.mintlify.com>.
3. Connect the repository and point Mintlify at the `docs/` folder.
4. Every push to `main` deploys automatically.

## Structure

```
docs/
├── docs.json                      # Theme + navigation
├── index.mdx                      # Landing page
├── getting-started/
├── architecture/
├── features/
├── development/
├── api-reference/
├── phase-guides/
├── PHASE1_SETUP.md                # Legacy long-form notes
└── PHASE2_AUTHENTICATION.md       # Legacy long-form notes
```

The legacy `.md` files are kept for reference; the canonical docs are the `.mdx` pages registered in `docs.json`.
