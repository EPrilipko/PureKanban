import { graphql } from 'generated/gql';

graphql(`
  fragment PartialCardRender on PartialCard {
    name
    description
    tags {
      ...TagRender
    }
  }

  fragment CardHistoryId on CardHistory {
    id
  }

  fragment CardHistoryRender on CardHistory {
    id
    createdAt
    author {
      ...UserShort
    }
    payload
  }

  fragment CardHistoryPaginatedRender on CardHistoryPaginated {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      cursor
      node {
        ...CardHistoryRender
      }
    }
  }
`);
