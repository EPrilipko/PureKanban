import type { FC } from 'react';
import { Stack, Text, ScrollArea } from '@mantine/core';

import { ROUTES } from '@/shared/model';

import {
  Notification,
  NotificationType,
  type NotificationRenderFragment,
} from '@/entities/notification';
import { UserLabel } from '@/entities/user';
import { CardLink } from '@/entities/card';

import { useNotificationsList } from '../../libs';

import { NotificationSkeleton } from './skeleton';

export interface Props {
  boardId: string;
  onlyUnread: boolean;
}

export const NotificationsListVisual: FC<Props> = ({ boardId, onlyUnread }) => {
  const { notifications, isFetching, fetchMore, readNotification } = useNotificationsList(
    boardId,
    onlyUnread,
  );

  return (
    <ScrollArea.Autosize mah={400} onBottomReached={fetchMore}>
      <Stack gap="xs" pr="md">
        {notifications.length === 0 ? (
          <Text c="dimmed" size="sm" ta="center" py="xl">
            Уведомления не найдены
          </Text>
        ) : (
          notifications.map((notification) => (
            <Notification
              key={notification.node.id}
              notification={notification.node}
              readNotification={readNotification}
            >
              <NotificationContent boardId={boardId} notification={notification.node} />
            </Notification>
          ))
        )}
      </Stack>

      {isFetching && <NotificationSkeleton />}
    </ScrollArea.Autosize>
  );
};

interface NotificationContentProps {
  boardId: string;
  notification: NotificationRenderFragment;
}

const NotificationContent: FC<NotificationContentProps> = ({ boardId, notification }) => {
  switch (notification.type) {
    case NotificationType.CardOwnerAdded:
      return (
        <Text size="sm">
          <UserLabel user={notification.actor} /> добавил вас в карточку&nbsp;
          <CardLink
            to={ROUTES.BOARD_CARD(boardId, notification.card.id)}
            card={notification.card}
          />
          &nbsp;исполнителем
        </Text>
      );
    case NotificationType.CardOwnerRemoved:
      return (
        <Text size="sm">
          <UserLabel user={notification.actor} /> удалил вас из исполнителей карточки&nbsp;
          <CardLink
            to={ROUTES.BOARD_CARD(boardId, notification.card.id)}
            card={notification.card}
          />
        </Text>
      );
    case NotificationType.CardAssigneesAdded:
      return (
        <Text size="sm">
          <UserLabel user={notification.actor} /> добавил вас в участники карточки&nbsp;
          <CardLink
            to={ROUTES.BOARD_CARD(boardId, notification.card.id)}
            card={notification.card}
          />
        </Text>
      );
    case NotificationType.CardAssigneesRemoved:
      return (
        <Text size="sm">
          <UserLabel user={notification.actor} /> удалил вас из участников карточки&nbsp;
          <CardLink
            to={ROUTES.BOARD_CARD(boardId, notification.card.id)}
            card={notification.card}
          />
        </Text>
      );
  }
};
