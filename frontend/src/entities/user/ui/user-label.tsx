import { type FC } from 'react';
import { Text } from '@mantine/core';

import { type UserShortFragment } from '../model';

interface Props {
  user: UserShortFragment;
}

export const UserLabel: FC<Props> = ({ user }) => (
  <Text component="span" fw="700">
    {user.firstName} {user.lastName}
  </Text>
);
