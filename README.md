<div align="center">

# SharePlate

### Food Rescue & Donation Network

**A polished React + TypeScript product prototype**

![SharePlate product preview](docs/preview.svg)

[Quick start](#-quick-start) · [Features](#-product-overview) · [Architecture](#-architecture) · [Quality checks](#-quality--verification) · [Limitations](#-important-limitations)

</div>

---

## Product overview

Connect surplus-food donors with NGOs and volunteers so usable food can reach people instead of becoming waste.

This repository is organized as a Vite application with reusable React components, typed source files, and bundled public assets. The graphic above is an **illustrative README preview**, not a claim that a live browser screenshot or production service was captured.

## Product highlights

- Surplus listings and category filters
- Donor, NGO, volunteer and admin views
- Claim workflow and role-aware dashboards
- Map and smart-match visualizer
- Impact metrics and activity feedback

## Interface preview

The preview artwork in [`docs/preview.svg`](docs/preview.svg) is intentionally stored in the repository so it renders directly on Git hosting platforms and remains available offline. It shows the intended visual hierarchy—navigation, summary cards, a primary activity panel, quick actions, and recent activity—without pretending to be a verified runtime screenshot.

## Technology

- **React · TypeScript · Vite · Tailwind CSS · React Router · Framer Motion · Lucide · canvas-confetti**
- **Build tooling:** Vite and TypeScript project references
- **Code quality:** ESLint configuration included
- **Static assets:** `public/` and `src/assets/`

## Quick start

### Requirements

- Node.js 20.19+ or 22.12+ recommended (use a currently supported LTS release)
- npm
- Internet access for installing packages and for any external data services the app uses

### Install and run

```bash
npm ci
npm run dev
```

Vite prints the local development address in the terminal (normally `http://localhost:5173`). Open that address in a modern browser.

### Production build and preview

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

Run the build and lint commands after changes. A successful development-server start alone does not guarantee a clean TypeScript build.

## Repository map

```text
.
├── public/                 # Static images, favicon, and public assets
├── docs/
│   └── preview.svg         # README product-interface preview artwork
├── src/
│   ├── assets/             # Imported source assets (where used)
│   ├── components/         # Reusable UI and feature components
│   ├── pages/              # Route-level screens (where applicable)
│   ├── lib/                # Shared helpers / domain logic (where applicable)
│   ├── context/             # Shared React state (where applicable)
│   ├── data/                # Demonstration data (where applicable)
│   ├── types/               # Shared TypeScript types (where applicable)
│   ├── App.tsx              # Application shell and routing
│   ├── index.css            # Global styles and design tokens
│   └── main.tsx             # React entry point
├── index.html
├── package.json
├── package-lock.json
├── tsconfig*.json
├── vite.config.ts
└── eslint.config.js
```

### Key files

- `src/components/` — feature UI sections and modals
- `src/context/AppContext.tsx` — shared application state and role selection
- `src/data/mockData.ts` — demo listings and sample records
- `src/types/index.ts` — shared TypeScript contracts
- `public/` — food photography, icons and static assets

## Architecture

```mermaid
flowchart TD
    A[Browser] --> B[index.html]
    B --> C[src/main.tsx]
    C --> D[App shell and routes]
    D --> E[Reusable components]
    D --> F[Page / feature views]
    E --> G[Shared styles and icons]
    F --> H[Domain logic and demo data]
    H --> I[Public assets]
```

The diagram describes the front-end flow, not a deployed cloud architecture. Any backend, authentication provider, persistence layer, or AI service must be configured separately if required.

## Quality & verification

Before submitting changes:

1. Run `npm ci` from this folder to install the exact lockfile dependencies.
2. Run `npm run lint` and resolve reported warnings/errors.
3. Run `npm run build` and confirm TypeScript and Vite both finish successfully.
4. Open the app at desktop and mobile widths; test every navigation item, modal, form, filter, and empty/error state.
5. Check browser DevTools for failed network requests, missing assets, and runtime exceptions.
6. Verify keyboard focus, visible labels, and reduced-motion behavior for interactive elements.

### Troubleshooting

- **Install fails:** check Node/npm versions and network access, then retry `npm ci`.
- **Port is occupied:** use the alternate port Vite offers, or run `npm run dev -- --port 5174`.
- **Assets do not load:** public assets should be referenced from the root, for example `/images/example.jpg`.
- **Build fails after edits:** inspect the first TypeScript/ESLint error first; later messages can be cascading errors.
- **External lookups fail:** browser privacy settings, CORS, rate limits, or network restrictions may block third-party endpoints.

## Important limitations

The current package is a client-side demonstration using local/mock data. It does not include a production API, database, or real account authentication.

Do not commit API keys, private user data, credentials, or production environment files. Keep secrets on a server, not in `VITE_*` variables, because Vite exposes those values to client-side code.

## License and attribution

No license was added by this README. Confirm ownership and third-party asset/font licenses before redistributing the project publicly.

---

<div align="center">

**Built for clarity, maintainability, and responsible iteration.**

</div>
