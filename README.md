# Northwood LMS — Modern School Learning Platform

Google-style student LMS built with **Vue 3 + TypeScript + Vite + Vuetify 3 (Material 3)**.
Original design inspired by modern educational dashboards: navigation rail/drawer,
welcome hero, course cards with progress, achievements, mini calendar, and task lists.

Runs on **mock data today** — the repository layer (`src/repositories/lmsRepo.ts`)
is the single seam to swap in a REST backend later without touching views.

## Tech Stack

- Vue 3 (Composition API) + Vite + Vue Router + Pinia
- Vuetify 3 (Material 3 components, light/dark `schoolLight`/`schoolDark` themes)
- Material Symbols Rounded icons + Roboto type
- Design tokens as CSS variables (`src/styles/tokens.css`)
- TypeScript, ESLint + Prettier + Oxlint, Vitest, Playwright

## Getting Started

```sh
npm install
npm run dev
# open http://localhost:5173
```

Demo sign-in: any valid email + any 6+ character password (mock session,
persisted in `localStorage`). No backend required.

Other scripts:

```sh
npm run build        # type-check + production build
npm run preview      # preview the build output
npm run test:unit    # unit tests (Vitest)
npm run test:e2e     # e2e tests (Playwright, Chromium)
npm run lint         # lint + autofix
```

## Folder Structure

```
src/
├── styles/
│   ├── tokens.css         # M3 color/space/shape/elevation tokens (light + .dark)
│   └── global.css         # base typography, focus, motion, helpers
├── plugins/vuetify.ts     # M3 theme: soft-blue primary #0b57d0, light surfaces
├── types/index.ts         # Student, Course, Assignment, ScheduleEvent, …
├── data/mockData.ts       # mock dataset shaped like future REST responses
├── repositories/
│   └── lmsRepo.ts         # async access layer — re-implement with HTTP for REST
├── stores/session.ts      # mock student session (localStorage persisted)
├── router/index.ts        # guest (login/register) vs auth (app shell) guards
├── components/
│   ├── layout/            # AppShell, SideNav, TopBar, MobileNav
│   ├── dashboard/         # WelcomeHero, CourseCard/Section, AchievementCard,
│   │                      # SchedulePanel, TaskList (+ accent helper)
│   ├── auth/              # AuthIllustration (inline SVG)
│   └── common/            # UserAvatar, EmptyState, LoadingState
└── views/                 # Dashboard, Schedule, Courses, Assignments, Resources,
                           # Grades, Certificates, Settings, Login, Register
```

## Switching to a Real Backend

1. Re-implement the functions in `src/repositories/lmsRepo.ts` with `fetch`/Axios calls.
2. Point `signIn`/`signUp` at your auth endpoints and store the real token/user
   in `src/stores/session.ts`.
3. Views, components and types stay unchanged.

## Design Notes

- Soft-blue primary `#0b57d0`, `primary-container #d3e3fd` hero, pastel course art
  (blue/purple/orange/green/red/teal), 12–28px shape scale, subtle elevation.
- Responsive: rail (tablet) → drawer (desktop) → bottom nav (mobile); grids
  collapse 3 → 2 → 1 column; verified at 375px–1440px widths.
- Accessibility: semantic landmarks, labelled icon buttons, visible focus rings,
  keyboard-operable calendar/tasks/quiz controls, `prefers-reduced-motion` support.
