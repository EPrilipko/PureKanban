import { graphql } from 'generated/gql';

export const CARD_HISTORY = graphql(`
  query cardHistory($input: CardByIdInput!, $pagination: PaginationArgs!) {
    cardById(input: $input) {
      id
      history(input: $pagination) {
        ...CardHistoryPaginatedRender
      }
    }
  }
`);
