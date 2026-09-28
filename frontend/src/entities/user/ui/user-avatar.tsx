import { type FC } from 'react';
import { Avatar as MantineAvatar } from '@mantine/core';

import { type UserShortFragment } from '../model';

interface Props {
  user: UserShortFragment;
  size?: number;
}

export const UserAvatar: FC<Props> = ({ user, size = 32 }) => {
  const initials = `${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`;

  return <MantineAvatar size={size}>{initials}</MantineAvatar>;
};
