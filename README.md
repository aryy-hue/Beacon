# Beacon — Learning Management System

A Google-style student LMS built with **Vue 3 + TypeScript + Vite + Vuetify 3 (Material 3)**.
Original design inspired by modern educational dashboards: navigation rail/drawer,
welcome hero, course cards with progress, achievements, mini calendar, and task lists.

Beacon is a **frontend project running entirely on mock data** — there is no backend and
no real authentication. Every screen is fed by `src/repositories/lmsRepo.ts`, which is the
single seam to swap in a REST API later without touching views, components or types.

## Highlights

- Dashboard with welcome hero, course progress, achievements, schedule and upcoming tasks
- Eight student views: Dashboard, Schedule, Courses, Assignments, Resources, Grades,
  Certificates, Settings
- Guest flow (Login / Register) with a staggered entrance, an animated illustration and a
  sign-in success flourish
- Light and dark Material 3 themes, persisted across reloads
- Responsive shell: navigation rail (tablet) → drawer (desktop) → bottom nav (mobile)
- Accessibility built in: semantic landmarks, labelled icon buttons, visible focus rings,
  keyboard-operable calendar and task controls, `prefers-reduced-motion` support

## Tech Stack

| Layer     | Choice                                                        |
| --------- | ------------------------------------------------------------- |
| Framework | Vue 3 (Composition API, `<script setup>`)                     |
| Build     | Vite 8, TypeScript 6                                          |
| UI        | Vuetify 3 (Material 3) with Material Symbols Rounded + Roboto |
| State     | Pinia (`session` store only)                                  |
| Routing   | Vue Router 5 with guest/auth guards                           |
| Styling   | Plain CSS with M3 design tokens as custom properties          |
| Quality   | ESLint, Oxlint, Prettier, Vitest, Playwright                  |

## Getting Started

Requirements: Node.js `^22.18.0 || >=24.12.0` and npm.

```sh
npm install
npm run dev
# open http://localhost:5173
```

**Demo sign-in:** any valid email address plus any password of 6+ characters. The mock
session is stored in `localStorage` (or `sessionStorage` when "Remember me" is unchecked),
so you can reload the app and stay signed in. No backend required.

## Scripts

| Command             | What it does                                |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Start the Vite dev server with HMR          |
| `npm run build`     | Type-check (`vue-tsc`) and build to `dist/` |
| `npm run preview`   | Serve the production build locally          |
| `npm run test:unit` | Vitest in watch mode                        |
| `npm run test:e2e`  | Playwright end-to-end tests (see below)     |
| `npm run lint`      | Oxlint + ESLint with autofix                |
| `npm run format`    | Prettier over `src/`                        |

### Running the end-to-end tests

Playwright needs its browsers and a running dev server:

```sh
npx playwright install chromium   # once per machine
npm run dev                        # in another terminal
npm run test:e2e
```

`e2e/vue.spec.ts` covers the guest redirect, the mock sign-in flow, the auth guard and
navigation between sections.

## Project Structure

```
├── e2e/vue.spec.ts           # Playwright specs
├── public/favicon.ico         # app icon (fonts are loaded from a CDN)
└── src/
    ├── main.ts               # app bootstrap, style imports, persisted theme
    ├── App.vue               # RouterView + auth route transition
    ├── styles/
    │   ├── tokens.css        # M3 color/space/shape/elevation/motion tokens
    │   ├── global.css        # base typography, focus, helpers, reduced motion
    │   └── animations.css    # shared keyframes + anim-* entrance utilities
    ├── plugins/vuetify.ts    # M3 theme: soft-blue primary #0b57d0, light surfaces
    ├── types/index.ts        # Student, Course, Assignment, ScheduleEvent, …
    ├── data/mockData.ts      # mock dataset shaped like future REST responses
    ├── repositories/
    │   └── lmsRepo.ts        # async access layer — re-implement with HTTP for REST
    ├── stores/session.ts     # mock student session (localStorage persisted)
    ├── router/index.ts       # guest (login/register) vs auth (app shell) guards
    ├── components/
    │   ├── layout/           # AppShell, SideNav, TopBar, MobileNav
    │   ├── dashboard/        # WelcomeHero, CourseCard/Section, AchievementCard,
    │   │                     # SchedulePanel, TaskList (+ accent helper)
    │   ├── auth/             # AuthIllustration (inline SVG, self-animating)
    │   └── common/           # UserAvatar, EmptyState, LoadingState
    └── views/                # Dashboard, Schedule, Courses, Assignments, Resources,
                              # Grades, Certificates, Settings, Login, Register
```

## Routing and Access

| Route                                         | Access                                                      |
| --------------------------------------------- | ----------------------------------------------------------- |
| `/login`, `/register`                         | Guest only — signed-in users are redirected to `/dashboard` |
| `/dashboard` … `/settings` (under `AppShell`) | Requires a session — guests are redirected to `/login`      |
| Anything else                                 | Redirects to `/dashboard`                                   |

## Switching to a Real Backend

1. Re-implement the functions in `src/repositories/lmsRepo.ts` with `fetch`/Axios calls.
2. Point `signIn`/`signUp` at your auth endpoints and store the real token/user in
   `src/stores/session.ts`.
3. Views, components and types stay unchanged — nothing else imports the mock data directly.

## Design System

- **Tokens** live in `src/styles/tokens.css` as CSS custom properties (spacing, shape,
  elevation, motion, color) with a `.dark` scope for the dark scheme.
- **Motion** lives in `src/styles/animations.css`: shared keyframes plus opt-in utilities
  (`anim-rise`, `anim-fade`, `anim-pop`) that stagger with `style="--i: n"`. Ambient loops
  use `anim-drift`, `anim-sway` and `anim-breathe`. All of it collapses under
  `prefers-reduced-motion`.
- **Palette**: soft-blue primary `#0b57d0`, `primary-container #d3e3fd` hero, pastel course
  art (blue/purple/orange/green/red/teal), 12–28px shape scale, subtle elevation.
- **Responsive**: grids collapse 3 → 2 → 1 column; verified at 375px–1440px widths.

## Repository Hygiene

`.gitignore` keeps the repository free of anything machine-local or sensitive. Ignored by
design:

- **Secrets and credentials** — `.env*` (only `.env.example` is allowed), `*.pem`, `*.key`,
  `*.p12`, `*.jks`, `credentials*.json`, `*service-account*.json`, `.npmrc`, `*.token`
- **Dependencies and caches** — `node_modules/`, `.pnpm-store/`, `.cache/`, `.vite/`,
  `.eslintcache`
- **Build and test output** — `dist/`, `coverage/`, `test-results/`, `playwright-report/`
- **Local settings and noise** — `.vscode/*` (except `extensions.json`), `.idea/`, editor
  swap files, OS files such as `.DS_Store` and `Thumbs.db`
- **Large binaries that are not needed** — `public/fonts/` (a 5 MB Material Symbols file
  that nothing references; the app loads its fonts from the Google Fonts CDN)

`package-lock.json` **is** committed on purpose so everyone installs the exact same
dependency tree.

### Environment variables

The app currently reads no environment variables — it runs on mock data. When the backend
lands, keep real values out of git:

```sh
cp .env.example .env.local   # .env.local stays untracked
```

Vite only exposes variables prefixed with `VITE_` to the client, so anything secret must
stay server-side.

## Naming

The product is **Beacon**. A few internal identifiers still carry the `northwood` name from
the original scaffold and are harmless, but worth knowing when you grep:

- CSS tokens are prefixed `--nw-` (`src/styles/tokens.css`)
- `localStorage` keys are `northwood_session` and `northwood_theme`
- The mock student profile uses the fictional school `northwood.school`
