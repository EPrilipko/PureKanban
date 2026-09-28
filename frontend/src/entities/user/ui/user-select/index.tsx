import { Suspense, type FC } from 'react';

import {
  UserSelectVisual,
  UserMultiSelectVisual,
  type SelectProps,
  type MultiSelectProps,
  type UserSelectItem,
} from './visual';
import { UserSelectSkeleton } from './skeleton';

export const UserSelect: FC<SelectProps> = (props) => (
  <Suspense fallback={<UserSelectSkeleton />}>
    <UserSelectVisual {...props} />
  </Suspense>
);

export const UserMultiSelect: FC<MultiSelectProps> = (props) => (
  <Suspense fallback={<UserSelectSkeleton />}>
    <UserMultiSelectVisual {...props} />
  </Suspense>
)

export type { UserSelectItem };
