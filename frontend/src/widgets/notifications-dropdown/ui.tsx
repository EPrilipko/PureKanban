import { useState, useEffect, type FC } from 'react';
import { Popover, SegmentedControl, Stack, Text, ActionIcon } from '@mantine/core';

import { IconBell } from '@tabler/icons-react';

import { UnreadNotificationsIndicator, NotificationsList } from '@/features/notification';
import { CardLinkClickEvent } from '@/entities/card';

interface Props {
  boardId: string;
}

type NotificationsFilter = 'all' | 'unread';

export const NotificationsDropdown: FC<Props> = ({ boardId }) => {
  const [filter, setFilter] = useState<NotificationsFilter>('all');
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const closeDropdown = () => setIsOpened(false);

    window.addEventListener(CardLinkClickEvent.EVENT_TYPE, closeDropdown);

    return () => window.removeEventListener(CardLinkClickEvent.EVENT_TYPE, closeDropdown);
  }, []);

  return (
    <Popover
      opened={isOpened}
      onChange={(isOpened) => setIsOpened(isOpened)}
      width={360}
      position="bottom-end"
      withArrow
      shadow="md"
      radius="md"
    >
      <Popover.Target>
        <UnreadNotificationsIndicator boardId={boardId}>
          <ActionIcon onClick={() => setIsOpened((opened) => !opened)} variant="outline">
            <IconBell size={14} />
          </ActionIcon>
        </UnreadNotificationsIndicator>
      </Popover.Target>

      <Popover.Dropdown p="md">
        <Stack gap="sm">
          <Text fw={600} size="md">
            Уведомления
          </Text>

          <SegmentedControl
            fullWidth
            value={filter}
            onChange={(value: NotificationsFilter) => setFilter(value)}
            data={[
              { label: 'Все', value: 'all' },
              { label: 'Непрочитанные', value: 'unread' },
            ]}
          />

          <NotificationsList onlyUnread={filter === 'unread'} boardId={boardId} />
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};
