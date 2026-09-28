import { Suspense, type FC } from 'react';

import { NotificationsListVisual, type Props } from './visual';
import { NotificationsListSkeleton } from './skeleton';

export const NotificationsList: FC<Props> = (props) => (
  <Suspense fallback={<NotificationsListSkeleton />}>
    <NotificationsListVisual {...props} />
  </Suspense>
);
