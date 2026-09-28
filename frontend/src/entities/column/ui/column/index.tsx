import { type FC, memo, type ReactNode } from 'react';
import clsx from 'clsx';
import { Flex, Text, isLightColor } from '@mantine/core';

import type { ColumnRenderFragment } from '../../model';

import styles from './column.module.css';

interface Slots {
  actions?: ReactNode;
  content?: ReactNode;
  bottom?: ReactNode;
}

interface Props {
  draggable?: boolean;
  column: ColumnRenderFragment;
  theme?: 'dragging' | 'dragOverlay' | 'cardsOverflow';
  slots?: Slots;
}

export const Column: FC<Props> = memo(({ draggable, column, theme, slots }) => {
  return (
    <Flex
      gap="sm"
      direction="column"
      className={clsx(
        styles.root,
        draggable && styles.rootDraggable,
        theme === 'dragging' && styles.rootDragging,
        theme === 'dragOverlay' && styles.rootDragOverlay,
        theme === 'cardsOverflow' && styles.rootMaxCardsCountOverlap,
      )}
    >
      <Flex
        pt="xs"
        pl="sm"
        pr="sm"
        justify="space-between"
        style={{ background: column.color }}
        pb="sm"
      >
        <Text c={isLightColor(column.color) ? 'black' : 'white'}>{column.name}</Text>

        {slots?.actions && (
          <div
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            {slots.actions}
          </div>
        )}
      </Flex>

      {slots?.content && <div className={styles.contentSlot}>{slots.content}</div>}

      {slots?.bottom && <div className={styles.bottomSlot}>{slots.bottom}</div>}
    </Flex>
  );
});
