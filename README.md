# Christina Lin's Portfolio

React, TypeScript, and Vite. Original project content and images are stored locally.

## Development

Install Node.js 22 or newer and pnpm 11, then run:

```sh
pnpm install
pnpm dev
```

`pnpm build` checks TypeScript and creates the static site in `dist/`.
`pnpm preview` serves that production build locally.

## Editing

- `src/content/site.json`: introduction, logo, and social links.
- `src/content/projects.json`: project names, categories, tags, and cover images.
- `src/content/<slug>.json`: ordered case-study content blocks, including headings, paragraphs, links, and images.
- `public/images/`: original downloaded images. Content paths omit the leading slash.
- `src/components/`: reusable layout, project card, and content rendering.
- `src/pages/`: page composition.
- `src/styles.css`: shared design tokens and responsive styles.

Add a project record and matching content file to create a project. The build creates its direct-link entry automatically. Existing Framer URL slugs are preserved.

## GitHub Pages

Push to a GitHub repository on `main`, then select **Settings → Pages → Source → GitHub Actions**. The included workflow builds and deploys automatically. The deployment reads the repository's Pages base path, supporting both repository URLs and custom domains.

Preview and compare every case study before switching the existing domain. To retain `christinalin.design`, configure it under the repository's Pages settings and update DNS after the new site is verified. No DNS changes have been made.

## Migration

`scripts/import-framer.mjs` imports published Framer content. It is a one-time migration utility, not part of the application or deployment. Rerunning it overwrites the content files. Raw source snapshots are kept in ignored `.migration/` for comparison. Imported case-study ordering, image descriptions, and grouping require visual review against the original pages.
