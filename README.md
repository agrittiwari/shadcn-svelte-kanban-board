# shadcn-svelte-kanban-board

A Svelte 5 Kanban board built with local shadcn-style primitives and Tailwind v4 tokens.

## Reasoning

The original repository was a React Router showcase app whose reusable value lived in a single registry component. Porting that structure directly to Svelte would keep too much React-only surface area around the real artifact. This rewrite narrows the project to the part that matters:

1. A Svelte 5 package under [`src/lib`](/Users/agrittiwari/os/shadcn-svelte-kanban-board/src/lib).
2. A demo app under [`src/App.svelte`](/Users/agrittiwari/os/shadcn-svelte-kanban-board/src/App.svelte).
3. A shadcn-style remote registry payload under [`public/r/kanban.json`](/Users/agrittiwari/os/shadcn-svelte-kanban-board/public/r/kanban.json).

The board stays self-contained by shipping the primitives it needs locally instead of depending on React or Radix packages.

## What is included

- `KanbanBoard.svelte` with editable columns and cards
- Immutable board helpers for add, remove, update, and move operations
- Local `Button`, `Input`, `Textarea`, `Badge`, and `Card` primitives
- Tailwind v4 token setup for shadcn-like colors and surfaces
- Registry metadata for remote installation flows

## Development

```bash
npm install
npm run dev
```

## Packaging

```bash
npm run build
npm run build:demo
```

## Public API

```ts
import {
  KanbanBoard,
  addCard,
  addColumn,
  moveCard,
  moveCardByOffset,
  removeCard,
  removeColumn,
  updateCard,
  updateColumn,
} from "shadcn-svelte-kanban-board";
```

## Example App

A minimal Svelte app using the package lives in [example](/Users/agrittiwari/os/shadcn-svelte-kanban-board/example).

It passes a concrete `columns` array with nested card rows into `KanbanBoard` in [example/src/App.svelte](/Users/agrittiwari/os/shadcn-svelte-kanban-board/example/src/App.svelte) and seeds that data from [example/src/board-data.ts](/Users/agrittiwari/os/shadcn-svelte-kanban-board/example/src/board-data.ts).

## Notes

- This turn does not install packages; the package exports the source library directly so the repo stays internally consistent without a generated `dist/` folder.
- Legacy React showcase files may still exist in the repo, but the active package and registry paths now point only at the Svelte 5 implementation.
