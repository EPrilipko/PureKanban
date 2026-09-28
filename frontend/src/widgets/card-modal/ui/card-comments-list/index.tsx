import { type FC, Suspense } from 'react';

import { CardCommentsListSkeleton } from './skeleton';
import { type Props, CardCommentsListVisual } from './visual';

export const CardCommentsList: FC<Props> = (props) => (
  <Suspense fallback={<CardCommentsListSkeleton />}>
    <CardCommentsListVisual {...props} />
  </Suspense>
);
