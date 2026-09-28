import { type FC, Suspense } from 'react';

import { BoardSelectVisual, type Props } from './visual';
import { BoardSelectSkeleton } from './skeleton';
export const BoardSelect: FC<Props> = (props) => (
  <Suspense fallback={<BoardSelectSkeleton />}>
    <BoardSelectVisual {...props} />
  </Suspense>
);
