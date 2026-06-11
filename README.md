# shadcn-svelte-kanban-board

Fork of the original React project [janhesters/shadcn-kanban-board](https://github.com/janhesters/shadcn-kanban-board), adapted into a Svelte 5 shadcn-svelte registry package by [agrittiwari](https://github.com/agrittiwari).

A Svelte 5 Kanban board built with local shadcn-style primitives and published as a hosted shadcn-svelte registry on Vercel.

## Credits

- Original concept and React implementation: [Jan Hesters](https://github.com/janhesters) / ReactSquad
- Svelte 5 registry adaptation and hosting: [agrittiwari](https://github.com/agrittiwari)

## Registry

- Hosted registry index: [shadcn-svelte-kanban-board.vercel.app/r/registry.json](https://shadcn-svelte-kanban-board.vercel.app/r/registry.json)
- Hosted Kanban item: [shadcn-svelte-kanban-board.vercel.app/r/kanban.json](https://shadcn-svelte-kanban-board.vercel.app/r/kanban.json)
- Repository: [github.com/agrittiwari/shadcn-svelte-kanban-board](https://github.com/agrittiwari/shadcn-svelte-kanban-board)

The live registry endpoint was verified on June 11, 2026 against the Vercel deployment.

## Install With pnpm

If your Svelte project is not initialized for shadcn-svelte yet:

```bash
pnpm dlx shadcn-svelte@latest init
```

Add the hosted Kanban board directly from the registry:

```bash
pnpm dlx shadcn-svelte@latest add https://shadcn-svelte-kanban-board.vercel.app/r/kanban.json
```

## Use In Your App

After installing from the registry, pass a `columns` array with nested card rows into the component:

```svelte
<script lang="ts">
  import KanbanBoard from "$lib/components/ui/kanban-board.svelte";

  let columns = [
    {
      id: "column-planning",
      title: "Planning",
      color: "blue",
      cards: [
        {
          id: "card-scope",
          title: "Define scope",
          description: "Capture the first release scope and non-goals.",
          tag: "Spec",
          color: "blue",
        },
      ],
    },
    {
      id: "column-build",
      title: "Build",
      color: "amber",
      cards: [
        {
          id: "card-example",
          title: "Wire the board",
          description: "Mount the board and bind the column state.",
          tag: "Example",
          color: "amber",
        },
      ],
    },
  ];

  let lastChange = null;
</script>

<KanbanBoard
  bind:columns
  onChange={(change) => {
    lastChange = change;
  }}
  title="Project board"
/>
```

## Example App

A minimal Svelte app using the package lives in [example](/Users/agrittiwari/os/shadcn-svelte-kanban-board/example).

- Example entry: [example/src/App.svelte](/Users/agrittiwari/os/shadcn-svelte-kanban-board/example/src/App.svelte)
- Example data: [example/src/board-data.ts](/Users/agrittiwari/os/shadcn-svelte-kanban-board/example/src/board-data.ts)

Build the example from the repo root:

```bash
pnpm build:example
```

## Local Development

Install dependencies:

```bash
pnpm install
```

Run the local demo app:

```bash
pnpm dev
```

Run the checks:

```bash
pnpm check
pnpm build
pnpm build:demo
pnpm build:example
```

## Contributing

1. Fork the repo and create a branch.
2. Install dependencies with `pnpm install`.
3. Make your source changes under [`src/lib`](/Users/agrittiwari/os/shadcn-svelte-kanban-board/src/lib).
4. Update the demo or the standalone example if your API changes.
5. Rebuild and verify:

```bash
pnpm check
pnpm build
pnpm build:demo
pnpm build:example
```

6. Rebuild the hosted registry payload with the shadcn-svelte CLI:

```bash
pnpm dlx shadcn-svelte@latest registry build registry.json -o public/r
```

7. Commit the updated source and generated `public/r/*.json` files.
8. Push to GitHub. Vercel will deploy the updated registry from the connected repository.

## What This Package Includes

- `KanbanBoard.svelte` with editable columns and cards
- Immutable helpers for add, remove, update, and move operations
- Local `Button`, `Input`, `Textarea`, `Badge`, and `Card` primitives
- Hosted shadcn-svelte registry JSON for remote installation

## Package API

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
