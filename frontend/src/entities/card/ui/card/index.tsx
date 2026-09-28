import { type FC, memo } from 'react';
import { Card as MantineCard } from '@mantine/core';
import clsx from 'clsx';

import type { CardRenderFragment } from '../../model';

import style from './card.module.css';

interface Props {
  card: CardRenderFragment;
  theme?: 'dragging' | 'dragOverlay';
  onClick?: () => void;
}

export const Card: FC<Props> = memo(({ card, theme, onClick }) => {
  return (
    <MantineCard
      radius="sm"
      p="sm"
      shadow={theme === 'dragOverlay' ? 'xl' : undefined}
      className={clsx(
        style.root,
        theme === 'dragging' && style.rootDragging,
        theme === 'dragOverlay' && style.rootDragOverlay,
      )}
      onClick={onClick}
    >
      {card.name}
    </MantineCard>
  );
});
