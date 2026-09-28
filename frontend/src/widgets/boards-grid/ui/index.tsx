import { Suspense } from 'react';

import { BoardsGridVisual } from './visual';
import { BoardsGridSkeleton } from './skeleton';

export const BoardsGrid = () => (
  <Suspense fallback={<BoardsGridSkeleton />}>
    <BoardsGridVisual />
  </Suspense>
);
