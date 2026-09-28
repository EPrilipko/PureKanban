import { type FC, Suspense } from 'react';

import { type Props, UnreadNotificationsIndicatorVisual } from './visual';
import { UnreadNotificationsIndicatorLoader } from './loader';

export const UnreadNotificationsIndicator: FC<Props> = (props) => (
  <Suspense fallback={<UnreadNotificationsIndicatorLoader />}>
    <UnreadNotificationsIndicatorVisual {...props} />
  </Suspense>
);
