import { graphql } from 'generated/gql';

export const GET_NOTIFICATIONS = graphql(`
  query getNotifications($input: GetNotificationsInput!) {
    notifications(input: $input) {
      ...NotificationPaginatedRender
    }
  }
`);

export type { GetNotificationsQuery } from 'generated/graphql';
