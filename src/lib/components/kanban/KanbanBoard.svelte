<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import Textarea from '$lib/components/ui/Textarea.svelte';
  import {
    addCard,
    addColumn,
    moveCard,
    moveCardByOffset,
    removeCard,
    removeColumn,
    updateCard,
    updateColumn,
    type DropTarget,
  } from '$lib/kanban';
  import type { KanbanBoardChange, KanbanColor, KanbanColumn } from '$lib/types';
  import { cn } from '$lib/utils';

  type Props = {
    class?: string;
    columns?: KanbanColumn[];
    editable?: boolean;
    onChange?: (change: KanbanBoardChange, columns: KanbanColumn[]) => void;
    showDescriptions?: boolean;
    title?: string;
  };

  let {
    class: className = '',
    columns = $bindable([] as KanbanColumn[]),
    editable = true,
    onChange,
    showDescriptions = true,
    title = 'Kanban board',
  }: Props = $props();

  let liveRegionMessage = $state('');
  let activeCard = $state<{ cardId: string; fromColumnId: string } | null>(null);
  let activeDropTarget = $state<DropTarget | null>(null);

  const colorClassMap: Record<KanbanColor, string> = {
    amber: 'bg-[var(--color-kanban-board-circle-amber)]',
    blue: 'bg-[var(--color-kanban-board-circle-blue)]',
    cyan: 'bg-[var(--color-kanban-board-circle-cyan)]',
    green: 'bg-[var(--color-kanban-board-circle-green)]',
    pink: 'bg-[var(--color-kanban-board-circle-pink)]',
    primary: 'bg-[var(--color-kanban-board-circle-primary)]',
    red: 'bg-[var(--color-kanban-board-circle-red)]',
    slate: 'bg-[var(--color-kanban-board-circle-slate)]',
    violet: 'bg-[var(--color-kanban-board-circle-violet)]',
  };

  function announce(message: string) {
    liveRegionMessage = '';
    requestAnimationFrame(() => {
      liveRegionMessage = message;
    });
  }

  function commit(next: { change: KanbanBoardChange; columns: KanbanColumn[] } | null) {
    if (!next) {
      return;
    }

    columns = next.columns;
    onChange?.(next.change, next.columns);
  }

  function onColumnTitleInput(columnId: string, value: string) {
    commit(updateColumn(columns, columnId, value));
  }

  function onCardTitleInput(columnId: string, cardId: string, value: string) {
    commit(updateCard(columns, columnId, cardId, { title: value }));
  }

  function onCardDescriptionInput(columnId: string, cardId: string, value: string) {
    commit(updateCard(columns, columnId, cardId, { description: value }));
  }

  function handleDragStart(event: DragEvent, columnId: string, cardId: string) {
    event.dataTransfer?.setData('text/plain', cardId);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }

    activeCard = { cardId, fromColumnId: columnId };
    announce(`Picked up card ${cardId}.`);
  }

  function handleCardDragOver(event: DragEvent, columnId: string, cardId: string) {
    event.preventDefault();
    event.stopPropagation();

    const currentTarget = event.currentTarget as HTMLElement | null;
    if (!currentTarget) {
      return;
    }

    const bounds = currentTarget.getBoundingClientRect();
    const midpoint = bounds.top + bounds.height / 2;
    activeDropTarget = {
      cardId,
      columnId,
      position: event.clientY <= midpoint ? 'before' : 'after',
      type: 'card',
    };
  }

  function handleColumnDragOver(event: DragEvent, columnId: string) {
    event.preventDefault();
    activeDropTarget = { columnId, type: 'column' };
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (!activeCard || !activeDropTarget) {
      return;
    }

    const next = moveCard(columns, activeCard.cardId, activeDropTarget);
    if (next) {
      commit(next);
      announce(`Moved card ${activeCard.cardId} to column ${activeDropTarget.columnId}.`);
    }

    activeCard = null;
    activeDropTarget = null;
  }

  function handleDragEnd() {
    activeCard = null;
    activeDropTarget = null;
  }

  function isCardDropTarget(columnId: string, cardId: string, position: 'before' | 'after') {
    return (
      activeDropTarget?.type === 'card' &&
      activeDropTarget.columnId === columnId &&
      activeDropTarget.cardId === cardId &&
      activeDropTarget.position === position
    );
  }

  function moveByDirection(columnId: string, cardId: string, direction: 'down' | 'left' | 'right' | 'up') {
    const next = moveCardByOffset(columns, columnId, cardId, direction);
    if (!next) {
      return;
    }

    commit(next);
    announce(`Moved card ${cardId} ${direction}.`);
  }
</script>

<div class={cn('flex h-full min-h-[32rem] flex-col gap-4', className)}>
  <div class="flex items-center justify-between gap-4">
    <div>
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Primitive</p>
      <h1 class="text-2xl font-semibold text-foreground">{title}</h1>
    </div>

    {#if editable}
      <Button class="shadow-sm" onclick={() => commit(addColumn(columns))} variant="default">
        Add column
      </Button>
    {/if}
  </div>

  <div
    aria-label={title}
    class="flex min-h-0 flex-1 gap-4 overflow-x-auto pb-4"
    role="list"
  >
    {#each columns as column, columnIndex (column.id)}
      <section
        aria-labelledby={`column-${column.id}`}
        class={cn(
          'flex w-[21rem] shrink-0 flex-col rounded-2xl border border-border bg-[color:var(--color-sidebar)] p-3 shadow-sm transition',
          activeDropTarget?.type === 'column' && activeDropTarget.columnId === column.id && 'border-primary',
        )}
        ondragover={(event) => handleColumnDragOver(event, column.id)}
        ondrop={handleDrop}
      >
        <header class="flex items-start justify-between gap-3">
          <div class="flex min-w-0 flex-1 items-center gap-3">
            <span
              aria-hidden="true"
              class={cn('mt-3 h-2.5 w-2.5 shrink-0 rounded-full', colorClassMap[column.color ?? 'primary'])}
            ></span>

            {#if editable}
              <Input
                id={`column-${column.id}`}
                class="border-transparent bg-transparent px-0 text-base font-semibold shadow-none focus-visible:ring-0"
                value={column.title}
                oninput={(event) =>
                  onColumnTitleInput(column.id, (event.currentTarget as HTMLInputElement).value)}
              />
            {:else}
              <h2 class="truncate text-base font-semibold text-foreground" id={`column-${column.id}`}>
                {column.title}
              </h2>
            {/if}
          </div>

          <div class="flex items-center gap-2">
            <Badge>{column.cards.length}</Badge>

            {#if editable}
              <Button
                aria-label={`Delete column ${column.title}`}
                onclick={() => commit(removeColumn(columns, column.id))}
                size="icon"
                variant="ghost"
              >
                Del
              </Button>
            {/if}
          </div>
        </header>

        <div class="mt-4 flex flex-1 flex-col gap-3 overflow-y-auto">
          {#if column.cards.length === 0}
            <div class="rounded-xl border border-dashed border-border bg-card/60 px-4 py-8 text-center text-sm text-muted-foreground">
              Drop cards here
            </div>
          {/if}

          {#each column.cards as card, cardIndex (card.id)}
            <div
              class={cn(
                'rounded-2xl transition',
                isCardDropTarget(column.id, card.id, 'before') && 'pt-3 border-t-2 border-primary',
                isCardDropTarget(column.id, card.id, 'after') && 'pb-3 border-b-2 border-primary',
              )}
            >
              <Card
                class={cn(
                  'group relative overflow-hidden border-border bg-card p-4',
                  activeCard?.cardId === card.id && 'rotate-[1deg] shadow-lg',
                )}
                draggable={editable}
                ondragend={handleDragEnd}
                ondragover={(event) => handleCardDragOver(event, column.id, card.id)}
                ondragstart={(event) => handleDragStart(event, column.id, card.id)}
                ondrop={handleDrop}
              >
                <div class="mb-3 flex items-start justify-between gap-2">
                  <div class="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      class={cn('h-2.5 w-2.5 rounded-full', colorClassMap[card.color ?? column.color ?? 'primary'])}
                    ></span>
                    {#if card.tag}
                      <Badge variant="outline">{card.tag}</Badge>
                    {/if}
                  </div>

                  {#if editable}
                    <div class="flex flex-wrap justify-end gap-1 opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">
                      <Button onclick={() => moveByDirection(column.id, card.id, 'left')} size="sm" variant="ghost">
                        Left
                      </Button>
                      <Button onclick={() => moveByDirection(column.id, card.id, 'up')} size="sm" variant="ghost">
                        Up
                      </Button>
                      <Button onclick={() => moveByDirection(column.id, card.id, 'down')} size="sm" variant="ghost">
                        Down
                      </Button>
                      <Button onclick={() => moveByDirection(column.id, card.id, 'right')} size="sm" variant="ghost">
                        Right
                      </Button>
                      <Button
                        onclick={() => commit(removeCard(columns, column.id, card.id))}
                        size="sm"
                        variant="ghost"
                      >
                        Del
                      </Button>
                    </div>
                  {/if}
                </div>

                {#if editable}
                  <Input
                    class="mb-3 border-transparent bg-transparent px-0 text-sm font-semibold shadow-none focus-visible:ring-0"
                    value={card.title}
                    oninput={(event) =>
                      onCardTitleInput(column.id, card.id, (event.currentTarget as HTMLInputElement).value)}
                  />
                {:else}
                  <h3 class="mb-2 text-sm font-semibold text-foreground">{card.title}</h3>
                {/if}

                {#if showDescriptions}
                  {#if editable}
                    <Textarea
                      class="min-h-24 border-transparent bg-transparent px-0 text-sm leading-6 shadow-none focus-visible:ring-0"
                      placeholder="Describe the task"
                      rows={3}
                      value={card.description ?? ''}
                      oninput={(event) =>
                        onCardDescriptionInput(
                          column.id,
                          card.id,
                          (event.currentTarget as HTMLTextAreaElement).value,
                        )}
                    />
                  {:else if card.description}
                    <p class="text-sm leading-6 text-muted-foreground">{card.description}</p>
                  {/if}
                {/if}

                <p class="mt-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Column {columnIndex + 1} / Card {cardIndex + 1}
                </p>
              </Card>
            </div>
          {/each}
        </div>

        {#if editable}
          <footer class="mt-3">
            <Button class="w-full justify-start" onclick={() => commit(addCard(columns, column.id))} variant="outline">
              Add card
            </Button>
          </footer>
        {/if}
      </section>
    {/each}
  </div>

  <p class="sr-only" aria-atomic="true" aria-live="polite">{liveRegionMessage}</p>
</div>
