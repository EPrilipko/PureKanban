import { graphql } from 'generated/gql';

graphql(`
  fragment CardCommentId on CardComment {
    id
  }

  fragment CardCommentRender on CardComment {
    id
    text
    createdAt
    user {
      ...UserShort
    }
  }

  fragment CardCommentPaginatedRender on CardCommentPaginated {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      cursor
      node {
        ...CardCommentRender
      }
    }
  }
`);
