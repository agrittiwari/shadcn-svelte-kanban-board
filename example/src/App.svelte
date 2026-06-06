<script lang="ts">
  import { KanbanBoard, type KanbanBoardChange, type KanbanColumn } from '../../src/lib/index.js';
  import { initialColumns } from './board-data.js';

  let columns = $state<KanbanColumn[]>(initialColumns);
  let lastChange = $state<KanbanBoardChange | null>(null);
</script>

<main class="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-6 py-10 lg:px-10">
  <section class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
    <KanbanBoard
      bind:columns
      onChange={(change) => {
        lastChange = change;
      }}
      title="Example app board"
    />

    <aside class="rounded-3xl border border-border bg-card/80 p-5 shadow-sm backdrop-blur">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Example</p>
      <h2 class="mt-2 text-xl font-semibold text-foreground">Passed columns</h2>
      <p class="mt-4 text-sm leading-6 text-muted-foreground">
        This app passes a concrete `columns` array with nested card rows into `KanbanBoard` and listens to
        the emitted `onChange` payload.
      </p>

      <div class="mt-6 rounded-2xl border border-border bg-[color:var(--color-sidebar)] p-4">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Last change</p>
        <pre class="mt-3 overflow-auto text-xs leading-6 text-foreground">{JSON.stringify(lastChange, null, 2)}</pre>
      </div>
    </aside>
  </section>
</main>
