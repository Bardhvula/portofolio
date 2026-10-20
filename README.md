# Bardhi Vula — Portfolio

Personal portfolio covering product implementation, banking technology, system integration, business analysis, and DevOps responsibilities.

## Features

- Responsive dark design with lime accents and typography from Google Fonts (local font fallbacks included).
- Animated delivery and payment-flow illustrations, entrance animations, and scroll progress.
- Filterable contributions across banking, operations, and enterprise software.
- Expandable project details and skill groups using native HTML disclosure elements.
- Career timeline with corrected dates: Kubit January 2023–March 2025; ASEE March 2025–present.
- Mobile navigation, active section highlighting, and keyboard-accessible controls.
- Reduced-motion preference support and a persistent animation toggle.
- Email, phone, LinkedIn, GitHub, and downloadable DOCX CV links.
- Copy email on HTTPS browsers that support the Clipboard API.

Core content, contact links, and expandable details remain usable without JavaScript. Interactive filters and the mobile menu are progressively enhanced. Flow diagrams are illustrative, not live infrastructure or production telemetry.

## Local preview

Open `dist/index.html` in a browser, or serve `dist` with a local static server. No build step or application backend is needed.

## Vercel deployment

Import https://github.com/Bardhvula/portofolio into Vercel, using the repository root, framework preset **Other**, no build command, and output directory **dist**. The output directory is also declared in `vercel.json`. No environment variables are required by the website.

The repository retains its existing Vercel analytics dependencies. The static portfolio does not import these npm modules or add new tracking behavior.

## Edit content

- `dist/index.html` — page content, project details, timeline, contact information, and metadata.
- `dist/styles.css` — responsive layouts, visual styling, and CSS animations.
- `dist/script.js` — filters, navigation, motion controls, scroll state, and clipboard behavior.
- `dist/Bardhi-Vula-CV.docx` — downloadable CV.
- `vercel.json` — deployment settings and headers.

Selected work describes professional contributions and delivery focus, not independently owned products. No client credentials, environment addresses, or private bank records are included.

## Validation

Checked JavaScript syntax, local asset paths, anchors, unique element IDs, corrected employment dates. A DOM simulation exercised menu state, project filtering, result announcements, motion preferences, scroll progress, and email copying. Browser rendering was not verified in this environment.
