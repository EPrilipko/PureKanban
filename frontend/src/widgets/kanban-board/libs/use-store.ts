import { create } from 'zustand';

import type { Card, Column } from '../model';

interface BoardPageStore {
  draggedCard: Card | null;
  setDraggedCard: (card: BoardPageStore['draggedCard']) => void;
  draggedColumn: Column | null;
  setDraggedColumn: (column: BoardPageStore['draggedColumn']) => void;
}

export const useBoardPageStore = create<BoardPageStore>((set) => ({
  draggedCard: null,
  setDraggedCard: (draggedCard) => set({ draggedCard }),
  draggedColumn: null,
  setDraggedColumn: (draggedColumn) => set({ draggedColumn }),
}));
