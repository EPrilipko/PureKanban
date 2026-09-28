import { type FC, useState } from 'react';
import { Group, Text } from '@mantine/core';
import { IconBriefcase } from '@tabler/icons-react';
import { useMutation } from '@apollo/client/react';

import { useUser } from '@/entities/session';
import {
  UserSelect,
  UserAvatar,
  type UserSelectItem,
  type UserShortFragment,
} from '@/entities/user';
import { UPDATE_CARD_OWNER } from '@/entities/card';

import styles from './card-owner-select.module.css';

interface Props {
  boardId: string;
  cardId: string;
  owner?: UserShortFragment | null;
}

export const CardOwnerSelect: FC<Props> = ({ boardId, cardId, owner }) => {
  const { canEditBoard } = useUser();
  const canEditCard = canEditBoard(boardId);

  const [inProgress, setInProgress] = useState(false);

  const [updateCardOwnerMutation] = useMutation(UPDATE_CARD_OWNER);

  const updateCardOwner = async (ownerId: number | null) => {
    setInProgress(true);

    await updateCardOwnerMutation({
      variables: {
        input: {
          boardId,
          id: cardId,
          ownerId,
        },
      },
    });

    setInProgress(false);
  };

  return (
    <UserSelect
      readOnly={!canEditCard}
      disabled={inProgress}
      searchable
      clearable
      allowDeselect={false}
      value={owner?.id || null}
      placeholder="Назначить исполнителя"
      label="Исполнитель"
      clearSectionMode="clear"
      variant="unstyled"
      classNames={{ root: styles.root }}
      styles={{
        input: {
          cursor: 'pointer',
          borderRadius: '4px',
          backgroundColor: 'var(--mantine-color-gray-1)',
          '&:hover': { backgroundColor: 'var(--mantine-color-gray-2)' },
        },
      }}
      renderOption={(data) => {
        const tOption = data.option as UserSelectItem;
        return (
          <Group gap="sm">
            <UserAvatar user={tOption.user} />
            <Text size="sm">{tOption.label}</Text>
          </Group>
        );
      }}
      leftSection={owner ? <UserAvatar user={owner} /> : <IconBriefcase size={16} color="gray" />}
      leftSectionPointerEvents="none"
      rightSectionPointerEvents="none"
      onChange={updateCardOwner}
    />
  );
};
