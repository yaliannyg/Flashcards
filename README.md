# Flashcards

A personal flashcard study app built with **Nuxt 4** and **MongoDB Atlas**. Create, organize, and review flashcards grouped by tag, track how often you get each card right or wrong, and rate each card's difficulty. It's a general-purpose study tool with no fixed subject.

> Solo project, deployed to AWS.

---

## Project Overview

Flashcards lets you build a personal deck of question/answer cards. Each card belongs to one or more **tags** (e.g. _Geography_, _Physics_, _History_) so you can filter your deck by topic and study a focused subset. During a study session you flip a card to reveal its answer and mark it **correct** or **incorrect** — the app keeps running success/failure counters per card. You can also assign each card a **difficulty rating** (shown as filled dots).

The app follows a strict layered backend architecture (model → mapper → service → API route → shared DTO) and a component-driven Vue frontend using the Composition API.

---

## Features

- **Create flashcards** — add a single card with a question, answer, and one or more tags.
- **Bulk create** — add multiple flashcards in one session via the dedicated add-flashcards flow.
- **Edit & delete** — update any card's question, answer, or tags, or remove it entirely. Deleting a card cleans up its references on every tag it belonged to.
- **Tag organization** — every card belongs to one or more tags (a card must always have at least one tag). Create new tags on the fly when adding cards.
- **Filter by tag** — browse the full deck, or drill into a single tag to study just that topic.
- **Study / review mode** — flip a card to reveal the answer and mark it **correct** or **incorrect**.
- **Review statistics** — each card tracks `successes` and `failures` counters.
- **Difficulty rating** — assign each card a difficulty level rendered as filled dots.
- **Live counters** — header total and sidebar tag/total counts stay in sync as you add or remove cards.
- **Tag sidebar** — navigation listing tags ordered by their number of questions.
- **Database seeding** — a seed script populates the database with sample tags and flashcards for local development.

---

## Technologies Used

### Frontend
- [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- [Nuxt 4](https://nuxt.com/) (file-based routing, layouts, `useFetch` data fetching)
- [Vue Router](https://router.vuejs.org/)
- [@heroicons/vue](https://github.com/tailwindlabs/heroicons) & [@lucide/vue](https://lucide.dev/) — icon sets

### Backend
- [Nitro](https://nitro.build/) — Nuxt's server engine (API route handlers)
- [Mongoose](https://mongoosejs.com/) ODM via [`nuxt-mongoose`](https://nuxt.com/modules/mongoose)
- [MongoDB Atlas](https://www.mongodb.com/atlas) — database

### Styling
- [Tailwind CSS v4](https://tailwindcss.com/) via [`@tailwindcss/vite`](https://tailwindcss.com/docs/installation/using-vite)

### Language & Tooling
- [TypeScript](https://www.typescriptlang.org/) (ESM, `"type": "module"`)
- [Vite](https://vite.dev/) — build tool (via Nuxt)
- [tsx](https://github.com/privatenumber/tsx) — runs TypeScript scripts (seeding)
- [dotenv](https://github.com/motdotla/dotenv) — environment variable loading
- [Node.js](https://nodejs.org/)

---

## Prerequisites

- **Node.js** (LTS recommended) and **npm**
- A **MongoDB Atlas** cluster (or any MongoDB instance) and its connection string

---

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd flashcards
npm install
```

The `postinstall` script automatically runs `nuxt prepare` to generate Nuxt's type definitions.

---

## Getting Started

1. **Configure environment variables** — create a `.env` file in the project root (see [Configuration](#configuration)).

2. **Seed the database** (optional, for sample data):

   ```bash
   npm run seed
   ```

3. **Start the dev server:**

   ```bash
   npm run dev
   ```

   The app runs at [http://localhost:3000](http://localhost:3000).

---

## Available Scripts / Commands

| Command            | Description                                                  |
|--------------------|--------------------------------------------------------------|
| `npm run dev`      | Start the dev server at `http://localhost:3000`              |
| `npm run build`    | Build the application for production                          |
| `npm run preview`  | Preview the production build locally                         |
| `npm run generate` | Static site generation                                       |
| `npm run seed`     | Seed the database with sample tags and flashcards            |
| `npm install`      | Install dependencies (runs `nuxt prepare` via `postinstall`) |

---

## Project Structure

```
app/
  app.vue            # Root component
  assets/css/        # Global styles (main.css)
  components/        # Vue components, grouped per-domain
    CreateCard/      #   card creation form fields
    Flashcard/       #   card display, answer, stats, tags, review actions, difficulty dots
    Tags/            #   tag selection / input
    UI/              #   shared UI primitives (BaseButton)
    Sidebar.vue
  composables/       # Reusable composition functions (useFlashcards, useTags, useSlug)
  layouts/           # Nuxt layouts (home, add-flashcards)
  pages/             # File-based routes (index, [slug], add-flashcards, edit/[id])

server/
  api/               # Nitro API route handlers ([resource]/[slug].method.ts)
    flashcards/
    tags/
  models/            # Mongoose schemas + inferred *DB types (Flashcards, Tags)
  services/          # Business logic — called by API handlers
  utils/             # Mappers (DB document → DTO)
  scripts/           # One-off scripts (seed.ts)

shared/
  types/             # DTOs / interfaces shared between client and server (*DTO)
```

### API Routes

| Method   | Route                          | Description                          |
|----------|--------------------------------|--------------------------------------|
| `GET`    | `/api/flashcards`              | List all flashcards                  |
| `POST`   | `/api/flashcards`              | Create a flashcard                   |
| `GET`    | `/api/flashcards/total`        | Total flashcard count                |
| `GET`    | `/api/flashcards/:id`          | Get a flashcard by id                |
| `PATCH`  | `/api/flashcards/:id`          | Update a flashcard                   |
| `DELETE` | `/api/flashcards/:id`          | Delete a flashcard                   |
| `GET`    | `/api/flashcards/tag/:slug`    | List flashcards for a tag            |
| `GET`    | `/api/tags`                    | List all tags                        |
| `POST`   | `/api/tags`                    | Create a tag                         |
| `DELETE` | `/api/tags/:slug`              | Delete a tag                         |

---

## Configuration

The app reads its MongoDB connection string from an environment variable. Create a `.env` file in the project root:

```bash
# .env
NUXT_MONGOOSE_URI="your-mongodb-atlas-connection-string"
```

| Variable             | Description                       |
|----------------------|-----------------------------------|
| `NUXT_MONGOOSE_URI`  | MongoDB Atlas connection string   |

> Both the `nuxt-mongoose` module and the seed script read the connection string from `NUXT_MONGOOSE_URI`.

---

## Development Guidelines

This project follows a strict layered architecture — please keep to these conventions when contributing.

### Backend layer rules
- **API handlers** (`server/api/`) are thin: they call a service and return the result. No business logic.
- **Services** (`server/services/`) contain all business logic, call models, and return DTOs via mappers.
- **Mappers** (`server/utils/*.mapper.ts`) convert a Mongoose document (`*DB` type) into a DTO — one mapper per model.
- **Models** (`server/models/`) define the Mongoose schema and export the model plus an `InferSchemaType`-based `*DB` type.
- **DTOs** (`shared/types/`) are plain interfaces used on both client and server, suffixed `*DTO`.
- **Adding a new resource?** Create all five: model → mapper → service → API route(s) → shared DTO.

### API route naming (Nitro conventions)
```
server/api/flashcards/index.get.ts       # GET    /api/flashcards
server/api/flashcards/index.post.ts      # POST   /api/flashcards
server/api/flashcards/[id].patch.ts      # PATCH  /api/flashcards/:id
server/api/flashcards/total.get.ts       # GET    /api/flashcards/total
```

### Frontend conventions
- Always use `<script setup lang="ts">` — Composition API only. No Options API.
- Components use PascalCase filenames, grouped into per-domain subfolders.
- Shared composables live in `app/composables/`.
- Do **not** use `withDefaults`. Static labels/text are module-level constants in `<script setup>`, not prop defaults.

### TypeScript conventions
- Use `import type { ... }` for types/interfaces.
- DB document types: `*DB` (e.g. `FlashcardDB`). Client-facing types: `*DTO` (e.g. `FlashcardDTO`, `TagDTO`).
- Use the `~~/` alias for imports from the project root (e.g. `~~/shared/types/flashcards.types`).

### Styling conventions
- Use canonical Tailwind CSS v4 utility classes — prefer the canonical form over deprecated aliases (e.g. `shrink-0`, not `flex-shrink-0`).

---

## Deployment

The app is deployed to **AWS**. Build the application for production with:

```bash
npm run build
```

This produces a Nitro server build in `.output/`, which can be run with `node .output/server/index.mjs`. Ensure `NUXT_MONGOOSE_URI` is configured in the production environment. See the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) for platform-specific guidance.

---

## Contributing

This is a personal/solo project. If you're contributing:

1. Follow the layered architecture and conventions in [Development Guidelines](#development-guidelines).
2. When adding a backend resource, always create the full chain: model → mapper → service → API route(s) → shared DTO.
3. Keep components in `<script setup lang="ts">` with the Composition API.
4. Implement changes and verify them manually in the browser (the dev server is not driven automatically).
