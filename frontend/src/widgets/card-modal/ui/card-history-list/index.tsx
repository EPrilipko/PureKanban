import { type FC, Suspense } from 'react';

import { CardHistoryListSkeleton } from './skeleton';
import { CardHistoryListVisual, type Props } from './visual';

export const CardHistoryList: FC<Props> = (props) => (
  <Suspense fallback={<CardHistoryListSkeleton />}>
    <CardHistoryListVisual {...props} />
  </Suspense>
);
