import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription, useSuspenseQuery } from '@apollo/client/react';
import { uniqBy } from 'lodash';

import { ROUTES } from '@/shared/model';

import { useUser } from '@/entities/session';
import {
  BOARD_CREATED,
  BOARD_UPDATED,
  BOARD_DELETED,
  type BoardIdFragment,
} from '@/entities/board';
import {
  BOARD_MEMBER_CREATED,
  BOARD_MEMBER_UPDATED,
  BOARD_MEMBER_DELETED,
} from '@/entities/board-member';

import { useEditBoardHandler, useDeleteBoardHandler } from '@/features/board';
import { useBoardMembersModal } from '@/features/board-members';

import { BOARDS_GRID_DATA, type BoardsGridDataQuery } from './api';

const mergeBoards = <T extends BoardIdFragment>(boards: T[], board: T): T[] =>
  boards.map((b) => (b.id === board.id ? board : b));

export const useBoardsGrid = () => {
  const navigate = useNavigate();
  const gotoBoardPage = (boardId: string) => {
    navigate(ROUTES.BOARD(boardId));
  };

  const { user } = useUser();

  const {
    data: { boards },
    subscribeToMore,
  } = useSuspenseQuery(BOARDS_GRID_DATA);

  const { openEditBoardModal } = useEditBoardHandler();
  const { openDeleteBoardModal } = useDeleteBoardHandler();
  const { openBoardMembersModal } = useBoardMembersModal();

  useEffect(() => {
    const createdUnsubscribe = subscribeToMore({
      document: BOARD_CREATED,
      updateQuery: (prev, { subscriptionData }) => {
        const createdBoard = subscriptionData.data.boardCreated;
        const tPrev = prev as BoardsGridDataQuery;

        if (!createdBoard) {
          return tPrev;
        }

        return {
          ...tPrev,
          boards: uniqBy([createdBoard, ...tPrev.boards], (board) => board.id),
        };
      },
    });

    const updatedUnsubscribe = subscribeToMore({
      document: BOARD_UPDATED,
      updateQuery: (prev, { subscriptionData }) => {
        const updatedBoard = subscriptionData.data.boardUpdated;
        const tPrev = prev as BoardsGridDataQuery;

        if (!updatedBoard) {
          return tPrev;
        }

        return {
          ...tPrev,
          boards: mergeBoards(tPrev.boards, updatedBoard),
        };
      },
    });

    const memberCreatedUnsubscribe = subscribeToMore({
      document: BOARD_MEMBER_CREATED,
      updateQuery: (prev, { subscriptionData }) => {
        const createdBoardMember = subscriptionData.data.boardMemberCreated;
        const tPrev = prev as BoardsGridDataQuery;

        if (!createdBoardMember) {
          return tPrev;
        }

        const userWasAddedToBoard = createdBoardMember.user.id === user.id;

        if (userWasAddedToBoard) {
          return {
            ...tPrev,
            boards: [createdBoardMember.board, ...tPrev.boards],
          };
        }

        return {
          ...tPrev,
          boards: mergeBoards(tPrev.boards, createdBoardMember.board),
        };
      },
    });

    const memberUpdatedUnsubscribe = subscribeToMore({
      document: BOARD_MEMBER_UPDATED,
      updateQuery: (prev, { subscriptionData }) => {
        const updatedBoardMember = subscriptionData.data.boardMemberUpdated;
        const tPrev = prev as BoardsGridDataQuery;

        if (!updatedBoardMember) {
          return tPrev;
        }

        return {
          ...tPrev,
          boards: mergeBoards(tPrev.boards, updatedBoardMember.board),
        };
      },
    });

    const memberDeletedUnsubscribe = subscribeToMore({
      document: BOARD_MEMBER_DELETED,
      updateQuery: (prev, { subscriptionData }) => {
        const deletedBoardMember = subscriptionData.data.boardMemberDeleted;
        const tPrev = prev as BoardsGridDataQuery;

        if (!deletedBoardMember) {
          return tPrev;
        }

        const userWasDeletedFromBoard = deletedBoardMember.user.id === user.id;

        if (userWasDeletedFromBoard) {
          return {
            ...tPrev,
            boards: tPrev.boards.filter((board) => board.id !== deletedBoardMember.board.id),
          };
        }

        return {
          ...tPrev,
          boards: mergeBoards(tPrev.boards, deletedBoardMember.board),
        };
      },
    });

    return () => {
      createdUnsubscribe();
      updatedUnsubscribe();
      memberCreatedUnsubscribe();
      memberUpdatedUnsubscribe();
      memberDeletedUnsubscribe();
    };
  }, [subscribeToMore]);

  useSubscription(BOARD_DELETED, {
    onData: ({ client, data }) => {
      const deletedBoard = data.data?.boardDeleted;
      if (!deletedBoard) {
        return;
      }

      client.cache.evict({ id: client.cache.identify(deletedBoard) });
      client.cache.gc();
    },
  });

  return {
    user,
    boards,
    openEditBoardModal,
    openDeleteBoardModal,
    openBoardMembersModal,
    gotoBoardPage,
  };
};
