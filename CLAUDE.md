# CLAUDE.md

## Project Overview

A personal flashcard study app built with Nuxt 4 and MongoDB Atlas. Users can create, read, update, and delete flashcards organized by tag, and play through them in a study session. No fixed subject — general purpose personal study.

Solo project. Deployed to Netlify.

## Tech Stack

- **Framework**: Nuxt 4 (Vue 3)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite`)
- **Database**: MongoDB Atlas via `nuxt-mongoose`
- **Runtime**: Node.js (ESM, `"type": "module"`)

## Dev Commands

```bash
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run generate     # Static site generation
npm run seed         # Seed the database (npx tsx server/scripts/seed.ts)
```

## Environment Variables

| Variable       | Description                        |
|----------------|------------------------------------|
| `MONGOOSE_URI` | MongoDB Atlas connection string    |

## Architecture

The project follows a strict layered architecture. Always follow this pattern when adding new features.

```
app/
  components/       # Vue components, grouped into per-domain subfolders (e.g. Flashcard/, UI/)
  composables/      # Reusable composition functions
  layouts/          # Nuxt layouts
  pages/            # File-based routes
  assets/css/       # Global styles (main.css)

server/
  api/              # Nitro API route handlers (named: [resource]/[slug].method.ts)
  models/           # Mongoose schema definitions + inferred DB types
  services/         # Business logic — called by API handlers
  utils/            # Mappers (DB type → DTO)
  scripts/          # One-off scripts (e.g., seed.ts)

shared/
  types/            # DTOs and interfaces shared between client and server
```

Current resources: `flashcards` and `tags` (flashcards belong to one or more tags).

### Layer rules

- **API handlers** (`server/api/`) are thin — they call a service and return the result. No business logic here.
- **Services** (`server/services/`) contain all business logic. They call models and use mappers to return DTOs.
- **Mappers** (`server/utils/*.mapper.ts`) convert a Mongoose DB document (`*DB` type) into a DTO. One mapper per model.
- **Models** (`server/models/`) define the Mongoose schema and export the model + `InferSchemaType`-based `*DB` type.
- **DTOs** (`shared/types/`) are plain interfaces used on both client and server. Suffix: `*DTO`.
- When adding a new resource: create model → mapper → service → API route(s) → shared DTO. Always all five.

## Vue / Frontend Conventions

- Always use `<script setup lang="ts">` — never Options API, never `<script>` without `setup`.
- Composition API only.
- Components use PascalCase filenames, grouped into per-domain subfolders (`Flashcard/Flashcard.vue`, `Flashcard/FlashcardStats.vue`, `UI/BaseButton.vue`).
- Pages live in `app/pages/` and use Nuxt file-based routing.
- Shared composables go in `app/composables/` (e.g. `useFlashcards`, `useSlug`).
- Do not use `withDefaults`. Static labels/text are module-level constants in `<script setup>`, not prop defaults.

## Verification

- Do not run the dev server or drive a browser to verify UI changes yourself (no `/run`, `/verify`, or ad-hoc dev server launches). Implement the change and let the user verify manually.

## Styling Conventions

- Use canonical Tailwind CSS v4 utility classes — when a class has a deprecated or non-canonical alias (e.g. `shrink-0` not `flex-shrink-0`), prefer the canonical form.

## TypeScript Conventions

- Use `type` imports (`import type { ... }`) for types/interfaces.
- DB document types are named `*DB` (e.g., `FlashcardDB`), derived via `InferSchemaType`.
- Client-facing types are named `*DTO` (e.g., `FlashcardDTO`, `TagDTO`) and live in `shared/types/`.
- Use `~~/` alias for imports from the project root (e.g., `~~/shared/types/flashcards.types`).

## API Route Naming

Follow Nuxt Nitro conventions:

```
server/api/flashcards/index.get.ts      # GET /api/flashcards
server/api/flashcards/index.post.ts     # POST /api/flashcards
server/api/flashcards/[slug].get.ts     # GET /api/flashcards/:slug
server/api/flashcards/total.get.ts      # GET /api/flashcards/total
server/api/tags/index.get.ts            # GET /api/tags
```
