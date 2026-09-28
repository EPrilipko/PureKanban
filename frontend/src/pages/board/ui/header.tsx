import { type FC } from 'react';
import { ActionIcon, Anchor, Breadcrumbs, Flex } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

import { PageHeader } from '@/entities/layout';

import { ROUTES } from '@/shared/model/routes';

import { UserMenu } from '@/widgets/user-menu';
import { NotificationsDropdown } from '@/widgets/notifications-dropdown';
import { BoardSelect } from '@/widgets/board-select';
import { boardSpotlightHandler } from '@/widgets/board-spotlight';

interface Props {
  boardId: string;
  onBoardClick: (boardId: string) => void;
}

export const Header: FC<Props> = ({ boardId, onBoardClick }) => (
  <PageHeader>
    <Flex h="100%" pl="md" pr="md" justify="space-between" align="center">
      <Breadcrumbs>
        <Anchor href={ROUTES.BOARDS_PATTERN}>All boards</Anchor>

        <BoardSelect value={boardId} onSelect={onBoardClick} />
      </Breadcrumbs>

      <Flex align="center" gap="sm">
        <NotificationsDropdown boardId={boardId} />

        <ActionIcon variant="outline" onClick={boardSpotlightHandler.open}>
          <IconSearch size={14} />
        </ActionIcon>

        <UserMenu />
      </Flex>
    </Flex>
  </PageHeader>
);
