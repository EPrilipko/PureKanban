import { graphql } from 'generated/gql';

export const NOTIFICATION_CREATED = graphql(`
  subscription notificationCreated($input: NotificationSubscriptionInput!) {
    notificationCreated(input: $input) {
      ...NotificationRender
    }
  }
`);

export const NOTIFICATION_UPDATED = graphql(`
  subscription notificationUpdated($input: NotificationSubscriptionInput!) {
    notificationUpdated(input: $input) {
      ...NotificationRender
    }
  }
`);

export const NOTIFICATION_UNREAD_COUNT_UPDATED = graphql(`
  subscription notificationUnreadCountUpdated($input: UnreadNotificationsCountUpdatedInput!) {
    notificationUnreadCountUpdated(input: $input)
  }
`);
