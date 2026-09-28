import { useRef, useState } from 'react';
import { type DragStartEvent, type DragEndEvent, type DragOverEvent } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';
import { move } from '@dnd-kit/helpers';
import { orderBy } from 'lodash';

import { type MoveCardInput } from '@/entities/card';
import { type MoveColumnInput } from '@/entities/column';

import type { Board, Card, Column } from '../model';

import { useBoardPageStore } from './use-store';

type DndColumnsData = Column[];
type DndCardsData = Record<string, Card[]>;

const prepareDndColumns = (board: Board): DndColumnsData =>
  orderBy(board.columns, (column) => column.rank);

const prepareDndCards = (board: Board): DndCardsData =>
  board.columns.reduce((acc, column) => {
    acc[column.id] = orderBy(column.cards, (card) => card.rank);

    return acc;
  }, {} as DndCardsData);

export const useDragNDrop = (
  board: Board,
  moveCard: (payload: MoveCardInput) => Promise<void>,
  moveColumn: (payload: MoveColumnInput) => Promise<void>,
) => {
  const boardColumnsRef = useRef<Column[]>(board.columns);

  const [dndColumns, setDndColumns] = useState<DndColumnsData>(prepareDndColumns(board));
  const [dndCards, setDndCards] = useState<DndCardsData>(prepareDndCards(board));
  const { setDraggedCard, setDraggedColumn } = useBoardPageStore();

  const onDragStart = (event: DragStartEvent) => {
    const { source } = event.operation;

    if (source?.type === 'card') {
      setDraggedCard(source.data as Card);
    } else if (source?.type === 'column') {
      setDraggedColumn(source.data as Column);
    }
  };

  const onDragEnd = async (event: DragEndEvent) => {
    const { source } = event.operation;

    if (isSortable(source)) {
      if (source.type === 'card') {
        const card = source.data as Card;
        const targetColumn = source.group as string;

        if (card.column.id === targetColumn) {
          const prevCard = dndCards[targetColumn][source.index - 1];
          const nextCard = dndCards[targetColumn][source.index + 1];

          await moveCard({
            boardId: board.id,
            cardId: card.id,
            prevCardId: prevCard?.id,
            nextCardId: nextCard?.id,
          });
        } else {
          const targetGroupCards = dndCards[targetColumn];
          const prevCard = targetGroupCards[source.index - 1];
          const nextCard = targetGroupCards[source.index + 1];

          await moveCard({
            boardId: board.id,
            cardId: card.id,
            columnId: targetColumn,
            prevCardId: prevCard?.id,
            nextCardId: nextCard?.id,
          });
        }

        setDraggedCard(null);
      } else if (source.type === 'column') {
        setDraggedColumn(null);

        const column = source.data as Column;

        const prevColumn = dndColumns[source.index - 1];
        const nextColumn = dndColumns[source.index + 1];

        await moveColumn({
          boardId: board.id,
          id: column.id,
          prevColumnId: prevColumn?.id,
          nextColumnId: nextColumn?.id,
        });
      }
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    if (event.operation.source?.type === 'card') {
      setDndCards((cards) => move(cards, event));
    } else if (event.operation.source?.type === 'column') {
      setDndColumns((columns) => move(columns, event));
    }
  };

  // eslint-disable-next-line
  if (boardColumnsRef.current !== board.columns) {
    setDndColumns(prepareDndColumns(board));
    setDndCards(prepareDndCards(board));
    // eslint-disable-next-line
    boardColumnsRef.current = board.columns;
  }

  return {
    dndCards,
    dndColumns,
    onDragStart,
    onDragEnd,
    onDragOver,
  };
};
