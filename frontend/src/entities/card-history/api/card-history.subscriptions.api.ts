import { graphql } from 'generated/gql';

export const CARD_HISTORY_CREATED = graphql(`
  subscription cardHistoryCreated($input: CardHistorySubscriptionInput!) {
    historyCreated(input: $input) {
      ...CardHistoryRender
      card {
        ...CardId
      }
    }
  }
`);
