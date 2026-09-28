import { graphql } from 'generated/gql';

export const CARD_COMMENTS = graphql(`
  query cardComments($input: CardByIdInput!, $pagination: PaginationArgs!) {
    cardById(input: $input) {
      id
      comments(input: $pagination) {
        ...CardCommentPaginatedRender
      }
    }
  }
`);

export type { CardCommentsQuery } from 'generated/graphql';
