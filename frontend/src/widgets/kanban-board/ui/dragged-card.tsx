import { DragOverlay } from '@dnd-kit/react';

import { Card } from '@/entities/card';

import { useBoardPageStore } from '../libs';

export const DraggedCard = () => {
  const { draggedCard } = useBoardPageStore();

  return draggedCard ? (
    <DragOverlay>
      <Card theme="dragOverlay" card={draggedCard} />
    </DragOverlay>
  ) : null;
};
