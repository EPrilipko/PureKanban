import { graphql } from 'generated/gql';

export const READ_NOTIFICATION = graphql(`
  mutation readNotification($boardId: ID!, $id: ID!) {
    readNotification(boardId: $boardId, id: $id) {
      ...NotificationRender
    }
  }
`);
