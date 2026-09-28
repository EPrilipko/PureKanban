import { graphql } from 'generated/gql';

export const CREATE_CARD = graphql(`
  mutation createCard($input: CreateCardInput!) {
    createCard(input: $input) {
      ...CardRender
      ...CardSort
      column {
        ...ColumnId
      }
    }
  }
`);

export const UPDATE_CARD = graphql(`
  mutation updateCard($input: UpdateCardInput!) {
    updateCard(input: $input) {
      ...CardRender
      ...CardSort
      column {
        ...ColumnId
      }
    }
  }
`);

export const MOVE_CARD = graphql(`
  mutation moveCard($input: MoveCardInput!) {
    moveCard(input: $input) {
      card {
        ...CardRender
        ...CardSort
        column {
          id
        }
      }
      sourceColumn {
        ...ColumnId
        cards {
          ...CardId
        }
      }
      targetColumn {
        ...ColumnId
        cards {
          ...CardId
        }
      }
    }
  }
`);

export const ATTACH_TAG_TO_CARD = graphql(`
  mutation attachTag($input: UpdateCardInput!) {
    updateCard(input: $input) {
      ...CardId
      tags {
        ...TagRender
      }
    }
  }
`);

export const UPDATE_CARD_OWNER = graphql(`
  mutation updateCardOwner($input: UpdateCardOwnerInput!) {
    updateCardOwner(input: $input) {
      ...CardId
      owner {
        ...UserShort
      }
    }
  }
`);

export const UPDATE_CARD_ASSIGNEES = graphql(`
  mutation updateCardAssignees($input: UpdateCardAssigneesInput!) {
    updateCardAssignees(input: $input) {
      ...CardId
      assignees {
        ...UserShort
      }
    }
  }
`);
