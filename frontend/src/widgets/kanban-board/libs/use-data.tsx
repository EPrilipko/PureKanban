import { useSuspenseQuery, useMutation } from '@apollo/client/react';

import {
  MOVE_COLUMN,
  COLUMN_CREATED,
  COLUMN_UPDATED,
  COLUMN_DELETED,
  type MoveColumnInput,
} from '@/entities/column';
import {
  MOVE_CARD,
  CARD_CREATED,
  CARD_UPDATED,
  CARD_MOVED,
  type MoveCardInput,
} from '@/entities/card';

import { GET_BOARD_DATA, type GetBoardDataQuery } from '../api';
import { useEffect } from 'react';
import { orderBy } from 'lodash';

export const useData = (boardId: string) => {
  const {
    data: { board },
    subscribeToMore,
  } = useSuspenseQuery(GET_BOARD_DATA, {
    variables: { boardId },
  });

  const [moveCardMutation] = useMutation(MOVE_CARD);
  const [moveColumnMutation] = useMutation(MOVE_COLUMN);

  const moveCard = async (input: MoveCardInput) => {
    await moveCardMutation({
      variables: {
        input,
      },
    });
  };

  const moveColumn = async (input: MoveColumnInput) => {
    await moveColumnMutation({
      variables: {
        input,
      },
    });
  };

  useEffect(() => {
    const cardCreatedUnsubscribe = subscribeToMore({
      document: CARD_CREATED,
      variables: { input: { boardId } },
      updateQuery: (prev, { subscriptionData }) => {
        const createdCard = subscriptionData.data.cardCreated;
        const tPrev = prev as GetBoardDataQuery;

        if (!createdCard) {
          return tPrev;
        }

        return {
          ...tPrev,
          board: {
            ...tPrev.board,
            columns: tPrev.board?.columns.map((column) => {
              if (column.id !== createdCard.column.id) {
                return column;
              }

              return {
                ...column,
                cards: [...column.cards, createdCard],
              };
            }),
          },
        };
      },
    });

    const cardUpdatedUnsubscribe = subscribeToMore({
      document: CARD_UPDATED,
      variables: { input: { boardId } },
      updateQuery: (prev, { subscriptionData }) => {
        const updatedCard = subscriptionData.data.cardUpdated;
        const tPrev = prev as GetBoardDataQuery;

        if (!updatedCard) {
          return tPrev;
        }

        return {
          ...tPrev,
          board: {
            ...tPrev.board,
            columns: tPrev.board.columns.map((column) => ({
              ...column,
              cards:
                column.id === updatedCard.column.id
                  ? column.cards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
                  : column.cards,
            })),
          },
        };
      },
    });

    const cardMovedUnsubscribe = subscribeToMore({
      document: CARD_MOVED,
      variables: { input: { boardId } },
      updateQuery: (prev, { subscriptionData }) => {
        const movedCard = subscriptionData.data.cardMoved;
        const tPrev = prev as GetBoardDataQuery;

        if (!movedCard || movedCard.sourceColumn.id === movedCard.targetColumn.id) {
          return tPrev;
        }

        return {
          ...tPrev,
          board: {
            ...tPrev.board,
            columns: tPrev.board.columns.map((column) => {
              if (column.id === movedCard.sourceColumn.id) {
                return {
                  ...column,
                  cards: column.cards.filter((card) => card.id !== movedCard.card.id),
                };
              } else if (column.id === movedCard.targetColumn.id) {
                return {
                  ...column,
                  cards: orderBy([movedCard.card, ...column.cards], (card) => card.rank),
                };
              } else {
                return column;
              }
            }),
          },
        };
      },
    });

    const columnCreatedUnsubscribe = subscribeToMore({
      document: COLUMN_CREATED,
      variables: { input: { boardId } },
      updateQuery: (prev, { subscriptionData }) => {
        const createdColumn = subscriptionData.data.columnCreated;
        const tPrev = prev as GetBoardDataQuery;

        if (!createdColumn) {
          return tPrev;
        }

        return {
          ...tPrev,
          board: {
            ...tPrev.board,
            columns: [createdColumn, ...tPrev.board.columns],
          },
        };
      },
    });

    const columnUpdatedUnsubscribe = subscribeToMore({
      document: COLUMN_UPDATED,
      variables: { input: { boardId } },
      updateQuery: (prev, { subscriptionData }) => {
        const updatedColumn = subscriptionData.data.columnUpdated;
        const tPrev = prev as GetBoardDataQuery;

        if (!updatedColumn) {
          return tPrev;
        }

        return {
          ...tPrev,
          board: {
            ...tPrev.board,
            columns: tPrev.board.columns.map((column) =>
              column.id === updatedColumn.id ? updatedColumn : column,
            ),
          },
        };
      },
    });

    const columnDeletedUnsubscribe = subscribeToMore({
      document: COLUMN_DELETED,
      variables: { input: { boardId } },
      updateQuery: (prev, { subscriptionData }) => {
        const deletedColumn = subscriptionData.data.columnDeleted;
        const tPrev = prev as GetBoardDataQuery;

        if (!deletedColumn) {
          return tPrev;
        }

        return {
          ...tPrev,
          board: {
            ...tPrev.board,
            columns: tPrev.board.columns.filter((column) => column.id !== deletedColumn.id),
          },
        };
      },
    });

    return () => {
      cardCreatedUnsubscribe();
      cardUpdatedUnsubscribe();
      cardMovedUnsubscribe();
      columnCreatedUnsubscribe();
      columnUpdatedUnsubscribe();
      columnDeletedUnsubscribe();
    };
  }, [boardId, subscribeToMore]);

  return {
    board,
    moveCard,
    moveColumn,
  };
};
