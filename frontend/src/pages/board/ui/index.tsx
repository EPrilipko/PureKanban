import { useCallback, type FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { ROUTES } from '@/shared/model';

import { KanbanBoard } from '@/widgets/kanban-board';
import { CardModal } from '@/widgets/card-modal';
import { BoardSpotlight } from '@/widgets/board-spotlight';

import { Header } from './header';

export const BoardPage: FC = () => {
  const navigate = useNavigate();
  const { boardId, cardId } = useParams();

  const tBoard = boardId!; // allow invalid boardId (will be treated later in KanbanBoard)

  const closeCardModal = useCallback(() => navigate(ROUTES.BOARD(tBoard)), [tBoard, navigate]);
  const openCardModal = useCallback(
    (cardId: string) => navigate(ROUTES.BOARD_CARD(tBoard, cardId)),
    [tBoard, navigate],
  );
  const openBoard = useCallback(
    () => (boardId: string) => navigate(ROUTES.BOARD(boardId)),
    [navigate],
  );

  return (
    <>
      <Header boardId={tBoard} onBoardClick={openBoard} />

      <KanbanBoard boardId={tBoard} onCardClick={openCardModal} />

      <BoardSpotlight boardId={tBoard} onCardClick={openCardModal} />

      {cardId && <CardModal boardId={tBoard} cardId={cardId} closeModal={closeCardModal} />}
    </>
  );
};
