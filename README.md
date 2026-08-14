# Vue Sandbox

A component workshop and design-system playground built with **Vue 3, TypeScript, and Vite**. It hosts reusable UI primitives in isolation, composed application demos that use them, and a data-driven test suite that renders every component — a Storybook-style catalog without the Storybook dependency.

## Highlights

- **Design tokens → primitives → apps.** A small set of CSS design tokens feeds a library of shared UI primitives (`Button`, `Input`, `Badge`, `SelectDropDown`), which in turn compose into full app demos.
- **Zero-config component catalog.** Drop a `*.story.ts` file next to a component and it appears in the sidebar automatically — no registry edits, no route wiring.
- **Two ways to view work.** Browse a component *in isolation* with its variants, or see it running inside a *composed app*.
- **Every component is tested.** A data-driven suite mounts each component and each of its variants, backed by focused unit tests on the primitives.

## Getting started

```bash
npm install
npm run dev      # start the dev server (Vite) at http://localhost:5173
```

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check (`vue-tsc`) and produce a production build |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run the Vitest suite once |
| `npm run test:watch` | Run Vitest in watch mode |

## Architecture

### Design tokens

Tokens are declared once in [`src/style.css`](src/style.css) inside Tailwind's `@theme` block. Each token emits **both** a CSS variable and a matching Tailwind utility, so a primitive can reference `border-field-border` in markup or `var(--color-field-border)` in styles — one source of truth for both.

```css
@theme {
  --color-field-bg: #ffffff;
  --color-field-border: #d1d5db;
  --color-field-border-focus: #6366f1;
  --radius-field: 0.5rem;
  /* … */
}
```

### The registry: one source of truth for navigation

[`src/registry.ts`](src/registry.ts) is the single place the app's navigation is derived from. It exposes two collections:

- **`apps`** — an explicit list of composed, stateful app demos (Product Sort, Tasks, Books, Users, …).
- **`components`** — reusable components in isolation, **auto-discovered** from co-located `*.story.ts` files via `import.meta.glob`. The slug is derived from the filename (`UserCard.story.ts` → `user-card`).

The sidebar renders straight from these arrays, and the route hosts resolve a URL slug back to a registry entry.

### Two route shapes

[`src/router.ts`](src/router.ts) defines two hosts, resolved by slug against the registry:

| Route | Host | Purpose |
| --- | --- | --- |
| `/apps/:slug` | [`AppHost.vue`](src/views/AppHost.vue) | A full, composed app running the real thing |
| `/component/:slug` | [`ComponentHost.vue`](src/views/ComponentHost.vue) | A single component in isolation, with a variant switcher |

Both views lazy-load their target via `defineAsyncComponent`, so every app and component is code-split.

### Stories

A story lives next to its component and describes how to render it. See [`src/types/story.ts`](src/types/story.ts) for the full contract.

```ts
// Button.story.ts
import { Plus } from 'lucide-vue-next'
import type { ComponentStory } from '../../types/story'

const story: ComponentStory = {
  title: 'Button',
  icon: Plus,
  component: () => import('./Button.vue'),
  variants: [
    { name: 'Default', slots: { default: 'Click me' }, props: { type: 'Default' } },
    { name: 'Alert',   slots: { default: 'Click me' }, props: { type: 'Alert', fontSize: 'md' } },
  ],
}

export default story
```

**To add a component to the catalog:** create the component, drop a `*.story.ts` beside it, done. It shows up in the sidebar and is picked up by the test suite automatically.

### State and data

- **Composables** ([`src/composables`](src/composables)) own async data fetching with `loading` / `error` state — e.g. `useBooks` and `useUsers`. `useUsers` serves a bundled snapshot (see [`src/mocks`](src/mocks)) so the demo renders without live connectivity.
- **Pinia stores** ([`src/stores`](src/stores)) hold cross-component state (the task list and the current user).

## Project structure

```
src/
├── components/          Composed components + their *.story.ts
│   └── ui/              Design-system primitives (Button, Input, Badge, SelectDropDown)
├── views/              Full app demos + the AppHost / ComponentHost route shells
├── composables/        Async data fetching (useUsers, useBooks)
├── stores/             Pinia stores (tasks, user)
├── mocks/              Bundled sample data
├── types/              Shared TypeScript types
├── registry.ts         Navigation + catalog source of truth
├── router.ts           The two route shapes
└── style.css           Design tokens (@theme)
```

## Testing

Tests run on **Vitest** with **@vue/test-utils** and a **happy-dom** environment (configured in [`vite.config.ts`](vite.config.ts)).

- [`catalog.test.ts`](src/components/catalog.test.ts) — data-driven across the whole registry: mounts **every component and every declared variant** the same way `ComponentHost` does, and asserts each renders. New components with a story are covered automatically.
- [`ui/primitives.test.ts`](src/components/ui/primitives.test.ts) — focused unit tests on the primitives: prop → class mapping, slotted content, and emitted events.
- [`content.test.ts`](src/components/content.test.ts) — content-level assertions that data-driven components put their props on screen (titles, formatted counts, derived initials).

```bash
npm test
```

## Tech stack

Vue 3 (`<script setup>`) · TypeScript · Vite · Tailwind CSS v4 (`@theme` tokens) · Pinia · Vue Router · lucide-vue-next · Vitest · @vue/test-utils
