# Codie Capital Research

A premium, responsive personal investment research and portfolio journal website for Codie Marillier.

The site is intentionally positioned as an educational and journalistic personal investing record. It does not solicit capital, manage money for other people, offer personalised financial advice, or present Codie as an authorised investment manager.

## Run locally

```bash
npm install
npm run dev
```

The Vite dev server will print a local URL, usually `http://localhost:5173`.

## Build for production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Edit site content

Most content is data-driven in:

```text
src/data/siteData.ts
```

Edit this file to update:

- Navigation links
- Portfolio snapshot values
- Holdings table rows
- Journal entries
- Research notes
- Letters
- Principles
- Rulebook items
- Disclaimer points

## Edit pages and components

Reusable components live in:

```text
src/components/
```

Route pages live in:

```text
src/pages/
```

The main router is:

```text
src/App.tsx
```

## Edit colours and fonts

Tailwind theme values are in:

```text
tailwind.config.js
```

Global styles and Google Font imports are in:

```text
src/styles/index.css
```

The current typography uses Cormorant Garamond for editorial headings and Inter for readable body copy.

## Hero image

The generated editorial hero asset is stored at:

```text
src/assets/research-hero.png
```

Replace that file or update the import in `src/components/Hero.tsx` to change the hero visual.

## Deploy to Cloudflare Pages

This is the preferred deployment target for `codiemarillier.com`.

1. Push the project to a Git repository.
2. In Cloudflare, open **Workers & Pages**.
3. Create a new **Pages** project and connect the repository.
4. Use these build settings:
   - Framework preset: `Vite` or `None`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: leave blank unless this project sits inside a larger repo
5. Deploy the project.
6. In the Pages project, open **Custom domains** and add:
   - `codiemarillier.com`
   - `www.codiemarillier.com`

The file `public/_redirects` keeps React Router pages working after refreshes, and `public/_headers` adds basic production security/cache headers.

## Deploy to Netlify

1. Push the project to a Git repository.
2. In Netlify, create a new site from the repository.
3. Use these build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy.

For React Router refresh support on Netlify, add this redirect if needed:

```text
/* /index.html 200
```

That can be placed in a `public/_redirects` file.
