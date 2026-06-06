# Example App

This directory shows the smallest useful Svelte app that consumes the Kanban board with explicit `columns` data.

## What it demonstrates

- importing `KanbanBoard` from the package source
- passing `columns` with nested card rows
- reacting to `onChange`
- binding the mutated board state back into the app

## Run it from the repo root

```bash
npx vite --config example/vite.config.ts
```

## Build it from the repo root

```bash
npx vite build --config example/vite.config.ts
```
