import { useSuspenseQuery } from '@apollo/client/react';

import { NOTIFICATION_UNREAD_COUNT_UPDATED } from '@/entities/notification';

import { COUNT_UNREAD_NOTIFICATIONS, type CountUnreadNotificationsQuery } from '../api';
import { useEffect } from 'react';

export const useUnreadNotificationsIndicator = (boardId: string) => {
  const {
    data: { countUnreadNotifications: unreadNotifications },
    subscribeToMore,
  } = useSuspenseQuery(COUNT_UNREAD_NOTIFICATIONS, {
    variables: {
      input: {
        boardId,
      },
    },
  });

  useEffect(() => {
    const unsubscribeCountUpdated = subscribeToMore({
      document: NOTIFICATION_UNREAD_COUNT_UPDATED,
      variables: { input: { boardId } },
      updateQuery: (prev, { subscriptionData }) => {
        const tPrev = prev as CountUnreadNotificationsQuery;

        if (!subscriptionData) {
          return tPrev;
        }

        return {
          ...tPrev,
          countUnreadNotifications: subscriptionData.data.notificationUnreadCountUpdated,
        };
      },
    });

    return () => {
      unsubscribeCountUpdated();
    };
  }, [boardId, subscribeToMore]);

  return { unreadNotifications };
};
