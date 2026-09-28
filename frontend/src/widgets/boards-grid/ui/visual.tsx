import { SimpleGrid, Card, Text, Group, Menu, ActionIcon } from '@mantine/core';
import { IconDots, IconTrash, IconEdit, IconShare3 } from '@tabler/icons-react';

import { BoardMemberRole } from '@/entities/board-member';

import { useBoardsGrid } from '../libs';

export const BoardsGridVisual = () => {
  const {
    boards,
    user,
    gotoBoardPage,
    openEditBoardModal,
    openDeleteBoardModal,
    openBoardMembersModal,
  } = useBoardsGrid();

  return (
    <SimpleGrid cols={2}>
      {boards.map((board) => {
        const shouldRenderActions = board.boardMembers.some(
          (boardMember) =>
            boardMember.user.id === user.id &&
            (boardMember.role === BoardMemberRole.Admin ||
              boardMember.role === BoardMemberRole.Author),
        );

        return (
          <Card
            key={board.id}
            withBorder
            shadow="sm"
            style={{ cursor: 'pointer' }}
            onClick={() => gotoBoardPage(board.id)}
          >
            <Card.Section withBorder inheritPadding py="xs">
              <Group justify="space-between">
                <Text fw={500}>{board.name}</Text>

                <div
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                >
                  {shouldRenderActions && (
                    <Menu
                      withinPortal
                      withOverlay
                      overlayProps={{ opacity: 0.3 }}
                      position="bottom-end"
                      shadow="sm"
                    >
                      <Menu.Target>
                        <ActionIcon variant="subtle" color="gray">
                          <IconDots size={16} />
                        </ActionIcon>
                      </Menu.Target>

                      <Menu.Dropdown>
                        <Menu.Item
                          leftSection={<IconShare3 size={14} />}
                          onClick={() => openBoardMembersModal(board)}
                        >
                          Share board
                        </Menu.Item>

                        <Menu.Item
                          leftSection={<IconEdit size={14} />}
                          onClick={() => openEditBoardModal(board)}
                        >
                          Edit board
                        </Menu.Item>

                        <Menu.Item
                          leftSection={<IconTrash size={14} />}
                          onClick={() => openDeleteBoardModal(board)}
                        >
                          Delete board
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  )}
                </div>
              </Group>
            </Card.Section>

            <Card.Section style={{ background: board.color }} mih={150} />
          </Card>
        );
      })}
    </SimpleGrid>
  );
};
