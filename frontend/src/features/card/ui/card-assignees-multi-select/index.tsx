import { type FC, useState } from 'react';
import { Group, Text, Badge } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import { useMutation } from '@apollo/client/react';

import { useUser } from '@/entities/session';
import {
  UserMultiSelect,
  UserAvatar,
  type UserSelectItem,
  type UserShortFragment,
} from '@/entities/user';
import { UPDATE_CARD_ASSIGNEES } from '@/entities/card';

import styles from './card-assignees-multi-select.module.css';

interface Props {
  boardId: string;
  cardId: string;
  assignees?: UserShortFragment[] | null;
}

export const CardAssigneesMultiSelect: FC<Props> = ({ boardId, cardId, assignees }) => {
  const { canEditBoard } = useUser();
  const canEditCard = canEditBoard(boardId);

  const [inProgress, setInProgress] = useState(false);

  const [updateCardAssigneesMutation] = useMutation(UPDATE_CARD_ASSIGNEES);

  const updateCardAssignees = async (assigneeIds: number[]) => {
    if (canEditCard) {
      setInProgress(true);

      await updateCardAssigneesMutation({
        variables: {
          input: {
            boardId,
            id: cardId,
            assigneeIds: assigneeIds.length ? assigneeIds : null,
          },
        },
      });

      setInProgress(false);
    }
  };

  const value = assignees?.map((assignee) => assignee.id);

  return (
    <UserMultiSelect
      searchable={canEditCard}
      loading={inProgress}
      value={value}
      placeholder="Участники"
      variant="unstyled"
      classNames={{ root: styles.root }}
      styles={{
        input: {
          cursor: 'pointer',
          borderRadius: '4px',
          backgroundColor: 'var(--mantine-color-gray-1)',
        },
      }}
      renderOption={(data) => {
        const tOption = data.option as UserSelectItem;
        const isSelected = data.checked;

        return (
          <Group
            gap="sm"
            style={{
              width: '100%',
              backgroundColor: isSelected ? 'var(--mantine-color-gray-3)' : 'transparent',
              fontWeight: isSelected ? 600 : 400,
              borderRadius: '4px',
              padding: '4px 8px',
            }}
          >
            <UserAvatar user={tOption.user} />
            <Text size="sm">{tOption.label}</Text>
          </Group>
        );
      }}
      renderPill={() => <></>}
      leftSection={<IconUser size={16} color="gray" />}
      rightSection={
        assignees?.length ? (
          <Badge circle color="gray">
            {assignees.length}
          </Badge>
        ) : null
      }
      leftSectionPointerEvents="none"
      rightSectionPointerEvents="none"
      onChange={updateCardAssignees}
    />
  );
};
