import { graphql } from 'generated/gql';

graphql(`
  fragment NotificationRender on Notification {
    id
    type
    createdAt
    isRead

    actor {
      ...UserShort
    }

    ... on CardOwnerAddedNotification {
      card {
        ...CardName
      }
    }

    ... on CardOwnerRemovedNotification {
      card {
        ...CardName
      }
    }

    ... on CardAssigneesAddedNotification {
      card {
        ...CardName
      }
    }

    ... on CardAssigneesRemovedNotification {
      card {
        ...CardName
      }
    }
  }

  fragment NotificationPaginatedRender on NotificationPaginated {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      cursor
      node {
        ...NotificationRender
      }
    }
  }
`);
