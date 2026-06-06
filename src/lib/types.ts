export const KANBAN_COLORS = [
  'primary',
  'slate',
  'red',
  'amber',
  'green',
  'cyan',
  'blue',
  'violet',
  'pink',
] as const;

export type KanbanColor = (typeof KANBAN_COLORS)[number];

export type KanbanCard = {
  id: string;
  title: string;
  description?: string;
  tag?: string;
  color?: KanbanColor;
};

export type KanbanColumn = {
  id: string;
  title: string;
  color?: KanbanColor;
  cards: KanbanCard[];
};

export type KanbanBoardChange =
  | { type: 'add-card'; columnId: string; cardId: string }
  | { type: 'add-column'; columnId: string }
  | { type: 'move-card'; cardId: string; fromColumnId: string; toColumnId: string }
  | { type: 'remove-card'; columnId: string; cardId: string }
  | { type: 'remove-column'; columnId: string }
  | { type: 'update-card'; columnId: string; cardId: string }
  | { type: 'update-column'; columnId: string };
