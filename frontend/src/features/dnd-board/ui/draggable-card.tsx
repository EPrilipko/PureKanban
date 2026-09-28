import { type FC } from 'react';
import { useSortable } from '@dnd-kit/react/sortable';

import { useUser } from '@/entities/session';
import { Card, type CardRenderFragment } from '@/entities/card';

interface Props {
  card: CardRenderFragment;
  index: number;
  boardId: string;
  columnId: string;
  onClick: (cardId: string) => void;
}

export const DraggableCard: FC<Props> = ({ card, index, boardId, columnId, onClick }) => {
  const { canEditBoard } = useUser();

  const canEditCard = canEditBoard(boardId);

  const { isDragging, ref } = useSortable({
    disabled: !canEditCard,
    id: card.id,
    type: 'card',
    accept: 'card',
    index: index,
    group: columnId,
    data: card,
  });

  return (
    <div ref={ref}>
      <Card
        card={card}
        theme={isDragging ? 'dragging' : undefined}
        onClick={() => onClick(card.id)}
      />
    </div>
  );
};
