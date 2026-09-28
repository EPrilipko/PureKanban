import { graphql } from 'generated/gql';

export const GET_CARD_BY_ID = graphql(`
  query getCardById($input: CardByIdInput!) {
    cardById(input: $input) {
      ...CardRender
      owner {
        ...UserShort
      }
      assignees {
        ...UserShort
      }
      tags {
        ...TagId
      }
      board {
        ...BoardId
        tags {
          ...TagRender
        }
      }
    }
  }
`);
