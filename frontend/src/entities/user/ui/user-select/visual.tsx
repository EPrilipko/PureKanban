import type { FC } from 'react';
import {
  Select,
  MultiSelect,
  type ComboboxItem,
  type SelectProps as MantineSelectProps,
  type MultiSelectProps as MantineMultiSelectProps,
} from '@mantine/core';
import { useSuspenseQuery } from '@apollo/client/react';

import { USERS_LIST } from '../../api';
import { type UserShortFragment } from '../../model';

export type UserSelectItem = ComboboxItem<number> & { user: UserShortFragment };

export type SelectProps = Omit<MantineSelectProps<number>, 'data'>;

const useUserOptions = () => {
  const {
    data: { users },
  } = useSuspenseQuery(USERS_LIST);

  const options: UserSelectItem[] = users.map((user) => ({
    label: `${user.firstName} ${user.lastName}`,
    value: user.id,
    user,
  }));

  return options;
};

export const UserSelectVisual: FC<SelectProps> = (props) => {
  const options = useUserOptions();

  return <Select<number> data={options} {...props} />;
};

export type MultiSelectProps = Omit<MantineMultiSelectProps<number>, 'data'>;

export const UserMultiSelectVisual: FC<MultiSelectProps> = (props) => {
  const options = useUserOptions();

  return <MultiSelect<number> data={options} {...props} />;
};
