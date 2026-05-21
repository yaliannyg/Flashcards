# CLAUDE.md

## Project Overview

A personal flashcard study app built with Nuxt 4 and MongoDB Atlas. Users can create, read, update, and delete flashcards organized by category. No fixed subject — general purpose personal study.

Solo project. Deployed to AWS.

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
  components/       # Vue components
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
- Components use PascalCase filenames (`Card.vue`, `CardsList.vue`).
- Pages live in `app/pages/` and use Nuxt file-based routing.
- Shared composables go in `app/composables/`.

## TypeScript Conventions

- Use `type` imports (`import type { ... }`) for types/interfaces.
- DB document types are named `*DB` (e.g., `CardDB`), derived via `InferSchemaType`.
- Client-facing types are named `*DTO` (e.g., `CardDTO`) and live in `shared/types/`.
- Use `~~/` alias for imports from the project root (e.g., `~~/shared/types/cards.types`).

## API Route Naming

Follow Nuxt Nitro conventions:

```
server/api/cards/index.get.ts      # GET /api/cards
server/api/cards/index.post.ts     # POST /api/cards
server/api/cards/[slug].get.ts     # GET /api/cards/:slug
```
