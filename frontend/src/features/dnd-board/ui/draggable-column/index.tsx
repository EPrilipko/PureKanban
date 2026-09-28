import { type FC, type ReactNode } from 'react';
import { Box } from '@mantine/core';
import { Virtuoso } from 'react-virtuoso';
import { useSortable } from '@dnd-kit/react/sortable';
import { CollisionPriority } from '@dnd-kit/abstract';
import { RestrictToHorizontalAxis } from '@dnd-kit/abstract/modifiers';

import { useUser } from '@/entities/session';
import { type CardRenderFragment } from '@/entities/card';
import { Column, type ColumnRenderFragment } from '@/entities/column';

import { DraggableCard } from '../draggable-card';

import styles from './draggable-column.module.css';
interface Slots {
  actions?: ReactNode;
  bottom?: ReactNode;
}

interface Props {
  index: number;
  boardId: string;
  column: ColumnRenderFragment;
  cards: CardRenderFragment[];
  slots?: Slots;
  onCardClick: (cardId: string) => void;
}

export const DraggableColumn: FC<Props> = ({
  column,
  boardId,
  index,
  cards,
  slots,
  onCardClick,
}) => {
  const { canEditBoard } = useUser();

  const canEditColumn = canEditBoard(boardId);

  const { isDragging, ref } = useSortable({
    disabled: !canEditColumn,
    id: column.id,
    type: 'column',
    accept: ['column', 'card'],
    index: index,
    data: column,
    collisionPriority: CollisionPriority.Low,
    modifiers: [RestrictToHorizontalAxis],
  });

  const theme = isDragging
    ? 'dragging'
    : column.maxCardsCount && column.maxCardsCount <= cards.length
      ? 'cardsOverflow'
      : undefined;

  const contentSlot = !!cards.length && (
    <Virtuoso
      totalCount={cards.length}
      className={styles.cardsList}
      computeItemKey={(index) => cards[index].id}
      itemContent={(index) => (
        <Box mb="xs">
          <DraggableCard
            index={index}
            boardId={boardId}
            card={cards[index]}
            columnId={column.id}
            onClick={onCardClick}
          />
        </Box>
      )}
    />
  );

  return (
    <div className={styles.root} ref={ref}>
      <Column
        draggable={canEditColumn}
        theme={theme}
        column={column}
        slots={{ actions: slots?.actions, content: contentSlot, bottom: slots?.bottom }}
      />
    </div>
  );
};
