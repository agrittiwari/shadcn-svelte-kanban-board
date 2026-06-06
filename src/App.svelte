<script lang="ts">
  import { KanbanBoard, type KanbanBoardChange, type KanbanColumn } from '$lib/index';

  let columns = $state<KanbanColumn[]>([
    {
      cards: [
        {
          color: 'violet',
          description: 'Lock the shared tokens, borders, and radius scale before expanding the component surface.',
          id: 'card-system',
          tag: 'System',
          title: 'Freeze the foundation',
        },
        {
          color: 'blue',
          description: 'Refactor the React-first registry payload into Svelte-native source files with no runtime React assumptions.',
          id: 'card-port',
          tag: 'Rewrite',
          title: 'Port the component',
        },
      ],
      color: 'violet',
      id: 'column-backlog',
      title: 'Backlog',
    },
    {
      cards: [
        {
          color: 'amber',
          description: 'Keep drag and drop simple, but make keyboard moves explicit through local controls.',
          id: 'card-accessibility',
          tag: 'A11y',
          title: 'Add pragmatic accessibility',
        },
        {
          color: 'green',
          description: 'Bundle the board with minimal local primitives so the registry payload is self-contained.',
          id: 'card-primitives',
          tag: 'UI',
          title: 'Ship local primitives',
        },
      ],
      color: 'amber',
      id: 'column-progress',
      title: 'In progress',
    },
    {
      cards: [
        {
          color: 'pink',
          description: 'Regenerate the public registry JSON from the Svelte source once the API shape is stable.',
          id: 'card-registry',
          tag: 'Registry',
          title: 'Publish remote payload',
        },
      ],
      color: 'pink',
      id: 'column-done',
      title: 'Done',
    },
  ]);

  let lastChange = $state<KanbanBoardChange | null>(null);
</script>

<main class="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-6 py-10 lg:px-10">
  <section class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
    <KanbanBoard
      bind:columns
      onChange={(change) => {
        lastChange = change;
      }}
      title="Svelte 5 shadcn Kanban"
    />

    <aside class="rounded-3xl border border-border bg-card/80 p-5 shadow-sm backdrop-blur">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">State</p>
      <h2 class="mt-2 text-xl font-semibold text-foreground">Why this rewrite works</h2>
      <ul class="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
        <li>Single Svelte 5 component tree with local primitives instead of React-only imports.</li>
        <li>Immutable helpers back every board mutation, so bindings and registry payload stay predictable.</li>
        <li>HTML drag-and-drop handles pointer movement, and explicit directional buttons cover keyboard movement.</li>
      </ul>

      <div class="mt-6 rounded-2xl border border-border bg-[color:var(--color-sidebar)] p-4">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Last change</p>
        <pre class="mt-3 overflow-auto text-xs leading-6 text-foreground">{JSON.stringify(lastChange, null, 2)}</pre>
      </div>
    </aside>
  </section>
</main>
