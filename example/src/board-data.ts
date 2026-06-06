import type { KanbanColumn } from '../../src/lib/index.js';

export const initialColumns: KanbanColumn[] = [
  {
    id: 'column-planning',
    title: 'Planning',
    color: 'blue',
    cards: [
      {
        id: 'card-scope',
        title: 'Define scope',
        description: 'Capture the first release scope and the non-goals for the board package.',
        tag: 'Spec',
        color: 'blue',
      },
      {
        id: 'card-api',
        title: 'Review public API',
        description: 'Verify the exported component and helper functions match the intended package surface.',
        tag: 'API',
        color: 'violet',
      },
    ],
  },
  {
    id: 'column-build',
    title: 'Build',
    color: 'amber',
    cards: [
      {
        id: 'card-example',
        title: 'Wire example app',
        description: 'Mount the Kanban board in a plain Svelte app and pass concrete column rows into it.',
        tag: 'Example',
        color: 'amber',
      },
      {
        id: 'card-verify',
        title: 'Verify interactions',
        description: 'Check add-card, move-card, and inline edits against the emitted change payloads.',
        tag: 'QA',
        color: 'green',
      },
    ],
  },
  {
    id: 'column-release',
    title: 'Release',
    color: 'pink',
    cards: [
      {
        id: 'card-publish',
        title: 'Prepare package output',
        description: 'Keep the build output and registry JSON aligned with the source implementation.',
        tag: 'Publish',
        color: 'pink',
      },
    ],
  },
];
