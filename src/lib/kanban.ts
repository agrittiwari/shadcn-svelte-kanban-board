import { createId } from '$lib/utils';
import type { KanbanBoardChange, KanbanCard, KanbanColumn } from '$lib/types';

type CardLocation = {
  card: KanbanCard;
  cardIndex: number;
  columnIndex: number;
};

export type DropTarget =
  | { columnId: string; type: 'column' }
  | { cardId: string; columnId: string; type: 'card'; position: 'before' | 'after' };

export function cloneColumns(columns: KanbanColumn[]) {
  return columns.map(column => ({
    ...column,
    cards: column.cards.map(card => ({ ...card })),
  }));
}

export function addColumn(columns: KanbanColumn[]): { change: KanbanBoardChange; columns: KanbanColumn[] } {
  const columnId = createId('column');
  return {
    change: { type: 'add-column', columnId },
    columns: [
      ...cloneColumns(columns),
      {
        cards: [],
        color: 'primary',
        id: columnId,
        title: 'New column',
      },
    ],
  };
}

export function removeColumn(columns: KanbanColumn[], columnId: string) {
  return {
    change: { type: 'remove-column', columnId } as const,
    columns: cloneColumns(columns).filter(column => column.id !== columnId),
  };
}

export function addCard(columns: KanbanColumn[], columnId: string) {
  const cardId = createId('card');
  const nextColumns = cloneColumns(columns).map(column =>
    column.id === columnId
      ? {
          ...column,
          cards: [
            ...column.cards,
            {
              color: column.color ?? 'primary',
              description: '',
              id: cardId,
              title: 'New card',
            },
          ],
        }
      : column,
  );

  return {
    change: { type: 'add-card', columnId, cardId } as const,
    columns: nextColumns,
  };
}

export function removeCard(columns: KanbanColumn[], columnId: string, cardId: string) {
  const nextColumns = cloneColumns(columns).map(column =>
    column.id === columnId
      ? {
          ...column,
          cards: column.cards.filter(card => card.id !== cardId),
        }
      : column,
  );

  return {
    change: { type: 'remove-card', columnId, cardId } as const,
    columns: nextColumns,
  };
}

export function updateColumn(columns: KanbanColumn[], columnId: string, title: string) {
  const nextColumns = cloneColumns(columns).map(column =>
    column.id === columnId ? { ...column, title } : column,
  );

  return {
    change: { type: 'update-column', columnId } as const,
    columns: nextColumns,
  };
}

export function updateCard(
  columns: KanbanColumn[],
  columnId: string,
  cardId: string,
  values: Partial<Pick<KanbanCard, 'description' | 'title'>>,
) {
  const nextColumns = cloneColumns(columns).map(column =>
    column.id === columnId
      ? {
          ...column,
          cards: column.cards.map(card => (card.id === cardId ? { ...card, ...values } : card)),
        }
      : column,
  );

  return {
    change: { type: 'update-card', columnId, cardId } as const,
    columns: nextColumns,
  };
}

function findCard(columns: KanbanColumn[], cardId: string): CardLocation | null {
  for (const [columnIndex, column] of columns.entries()) {
    const cardIndex = column.cards.findIndex(card => card.id === cardId);
    if (cardIndex !== -1) {
      return {
        card: column.cards[cardIndex],
        cardIndex,
        columnIndex,
      };
    }
  }

  return null;
}

export function moveCard(columns: KanbanColumn[], cardId: string, target: DropTarget) {
  const nextColumns = cloneColumns(columns);
  const source = findCard(nextColumns, cardId);

  if (!source) {
    return null;
  }

  if (target.type === 'card' && target.cardId === cardId) {
    return null;
  }

  const sourceColumnId = nextColumns[source.columnIndex].id;
  const targetColumnIndex = nextColumns.findIndex(column => column.id === target.columnId);
  if (targetColumnIndex === -1) {
    return null;
  }

  const [movedCard] = nextColumns[source.columnIndex].cards.splice(source.cardIndex, 1);

  if (target.type === 'column') {
    nextColumns[targetColumnIndex].cards.push(movedCard);
  } else {
    const targetCardIndex = nextColumns[targetColumnIndex].cards.findIndex(
      card => card.id === target.cardId,
    );

    if (targetCardIndex === -1) {
      nextColumns[targetColumnIndex].cards.push(movedCard);
    } else {
      const insertionIndex = target.position === 'before' ? targetCardIndex : targetCardIndex + 1;
      nextColumns[targetColumnIndex].cards.splice(insertionIndex, 0, movedCard);
    }
  }

  return {
    change: {
      type: 'move-card',
      cardId,
      fromColumnId: sourceColumnId,
      toColumnId: target.columnId,
    } as const,
    columns: nextColumns,
  };
}

export function moveCardByOffset(
  columns: KanbanColumn[],
  columnId: string,
  cardId: string,
  direction: 'down' | 'left' | 'right' | 'up',
) {
  const nextColumns = cloneColumns(columns);
  const sourceColumnIndex = nextColumns.findIndex(column => column.id === columnId);
  if (sourceColumnIndex === -1) {
    return null;
  }

  const sourceCardIndex = nextColumns[sourceColumnIndex].cards.findIndex(card => card.id === cardId);
  if (sourceCardIndex === -1) {
    return null;
  }

  if (direction === 'up' || direction === 'down') {
    const destinationIndex = direction === 'up' ? sourceCardIndex - 1 : sourceCardIndex + 1;
    if (destinationIndex < 0 || destinationIndex >= nextColumns[sourceColumnIndex].cards.length) {
      return null;
    }

    const cards = [...nextColumns[sourceColumnIndex].cards];
    const [movedCard] = cards.splice(sourceCardIndex, 1);
    cards.splice(destinationIndex, 0, movedCard);
    nextColumns[sourceColumnIndex] = { ...nextColumns[sourceColumnIndex], cards };

    return {
      change: {
        type: 'move-card',
        cardId,
        fromColumnId: columnId,
        toColumnId: columnId,
      } as const,
      columns: nextColumns,
    };
  }

  const destinationColumnIndex = direction === 'left' ? sourceColumnIndex - 1 : sourceColumnIndex + 1;
  if (destinationColumnIndex < 0 || destinationColumnIndex >= nextColumns.length) {
    return null;
  }

  const [movedCard] = nextColumns[sourceColumnIndex].cards.splice(sourceCardIndex, 1);
  nextColumns[destinationColumnIndex].cards.push(movedCard);

  return {
    change: {
      type: 'move-card',
      cardId,
      fromColumnId: columnId,
      toColumnId: nextColumns[destinationColumnIndex].id,
    } as const,
    columns: nextColumns,
  };
}
