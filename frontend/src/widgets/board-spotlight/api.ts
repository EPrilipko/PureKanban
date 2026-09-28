import { graphql } from 'generated/gql';

export const SEARCH_CARDS = graphql(`
  query searchCards($input: SearchCardsInput!) {
    searchCards(input: $input) {
      ...CardRender
    }
  }
`);
