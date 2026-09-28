import { type FC } from 'react';
import { Stack, Menu, ActionIcon, darken, Flex } from '@mantine/core';
import { IconDots, IconEdit, IconTrash } from '@tabler/icons-react';
import { DragDropProvider } from '@dnd-kit/react';

import { useUser } from '@/entities/session';
import { DraggableColumn } from '@/features/dnd-board';
import { CreateCardInput } from '@/features/card';
import {
  CreateColumnButton,
  useEditColumnHandler,
  useDeleteColumnHandler,
} from '@/features/column';

import { useData, useDragNDrop } from '../../libs';
import { DraggedCard } from '../dragged-card';
import { DraggedColumn } from '../dragged-column';

import styles from './board.module.css';

interface Props {
  boardId: string;
  onCardClick: (cardId: string) => void;
}

export const KanbanBoard: FC<Props> = ({ boardId, onCardClick }) => {
  const { canEditBoard } = useUser();
  const { board, moveCard, moveColumn } = useData(boardId);

  const canEditColumns = canEditBoard(boardId);

  const { dndCards, dndColumns, onDragStart, onDragEnd, onDragOver } = useDragNDrop(
    board,
    moveCard,
    moveColumn,
  );

  const { openEditColumnModal } = useEditColumnHandler(boardId);
  const { openDeleteColumnModal } = useDeleteColumnHandler(boardId);

  return (
    <Stack gap="md" className={styles.root} style={{ background: board.color }}>
      <DragDropProvider onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
        <Flex className={styles.dndContent}>
          {dndColumns.map((column, index) => {
            const actionIconBg = darken(column.color, 10);

            return (
              <DraggableColumn
                boardId={boardId}
                key={column.id}
                column={column}
                index={index}
                cards={dndCards[column.id]}
                onCardClick={onCardClick}
                slots={{
                  actions: canEditColumns && (
                    <Menu
                      withinPortal
                      withOverlay
                      overlayProps={{ opacity: 0.3 }}
                      position="bottom-end"
                      shadow="sm"
                    >
                      <Menu.Target>
                        <ActionIcon variant="subtle" color={actionIconBg}>
                          <IconDots size={16} />
                        </ActionIcon>
                      </Menu.Target>

                      <Menu.Dropdown>
                        <Menu.Item
                          leftSection={<IconEdit size={14} />}
                          onClick={() => openEditColumnModal(column)}
                        >
                          Редактировать колонку
                        </Menu.Item>

                        <Menu.Item
                          leftSection={<IconTrash size={14} />}
                          onClick={() => openDeleteColumnModal(column.id)}
                        >
                          Удалить колонку
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  ),
                  bottom: canEditColumns && (
                    <CreateCardInput boardId={boardId} columnId={column.id} />
                  ),
                }}
              />
            );
          })}

          <div className={styles.createColumnButton}>
            <CreateColumnButton boardId={board.id} />
          </div>
        </Flex>

        <DraggedCard />
        <DraggedColumn />
      </DragDropProvider>
    </Stack>
  );
};
