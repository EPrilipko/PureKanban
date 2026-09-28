import { graphql } from 'generated/gql';

export const COUNT_UNREAD_NOTIFICATIONS = graphql(`
  query countUnreadNotifications($input: CountNotificationsInput!) {
    countUnreadNotifications(input: $input)
  }
`);

export type { CountUnreadNotificationsQuery } from 'generated/graphql';
