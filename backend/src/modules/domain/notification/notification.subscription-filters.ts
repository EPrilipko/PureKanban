import { IGraphQLContext } from '@/common/interfaces/context.interface';

import { byBoardMembers } from '@/common/graphql/filters/byBoardMembers';

import {
  NotificationSubscriptionPayload,
  UnreadNotificationsCountUpdatedPayload,
  NotificationSubscriptionInput,
} from './dto';

export const notificationFilter = (
  payload: NotificationSubscriptionPayload,
  variables: { input: NotificationSubscriptionInput },
  context: IGraphQLContext,
): boolean => {
  const mainFilter = byBoardMembers(payload, context);

  if (mainFilter) {
    const currentUser = context.req.user;

    if (currentUser?.id === payload.notification.recipient.id) {
      return 'onlyUnread' in variables.input
        ? !payload.notification.isRead
        : true;
    }
  }
  return false;
};

export const notificationCountFilter = (
  payload: UnreadNotificationsCountUpdatedPayload,
  context: IGraphQLContext,
): boolean => {
  const currentUser = context.req.user;

  if (currentUser) {
    return currentUser.id === payload.userId;
  }

  return false;
};
