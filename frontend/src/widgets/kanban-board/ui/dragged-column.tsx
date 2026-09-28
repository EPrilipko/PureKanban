import { DragOverlay } from '@dnd-kit/react';

import { Column } from '@/entities/column';

import { useBoardPageStore } from '../libs';

export const DraggedColumn = () => {
  const { draggedColumn } = useBoardPageStore();

  return draggedColumn ? (
    <DragOverlay>
      <Column theme="dragOverlay" column={draggedColumn} />
    </DragOverlay>
  ) : null;
};
