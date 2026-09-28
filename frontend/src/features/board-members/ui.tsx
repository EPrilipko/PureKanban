import { type FC } from 'react';
import {
  Text,
  ScrollArea,
  Group,
  SegmentedControl,
  Pill,
  ActionIcon,
  Stack,
  Flex,
} from '@mantine/core';
import { IconCrown, IconTrash } from '@tabler/icons-react';

import { UserSelect } from '@/entities/user';
import { type BoardMembersFragment } from '@/entities/board';
import { BoardMemberRole } from '@/entities/board-member';

import { useBoardMembersForm } from './libs';

interface Props {
  board: BoardMembersFragment;
}

export const BoardMembersForm: FC<Props> = ({ board }) => {
  const { boardMembers, createBoardMember, updateBoardMember, deleteBoardMember, filterUsers } =
    useBoardMembersForm(board.id);

  return (
    <>
      <UserSelect value={null} onChange={createBoardMember} filter={filterUsers} />

      {boardMembers.length && (
        <ScrollArea mt="md" h={350}>
          <Stack gap="sm">
            {boardMembers.map((boardMember) => (
              <Group key={boardMember.user.id} gap="3xs">
                <Text>
                  {boardMember.user.firstName} {boardMember.user.lastName}
                </Text>

                {boardMember.role === BoardMemberRole.Author ? (
                  <Pill ml="auto" bg="yellow" radius="md">
                    <Flex gap="3xs" align="center">
                      <IconCrown size={14} /> {BoardMemberRole.Author}
                    </Flex>
                  </Pill>
                ) : (
                  <>
                    <SegmentedControl
                      data={[BoardMemberRole.Admin, BoardMemberRole.User]}
                      value={boardMember.role}
                      ml="auto"
                      onChange={(value) => updateBoardMember(boardMember.user.id, value)}
                    />

                    <ActionIcon
                      variant="outline"
                      color="dimmed"
                      onClick={() => deleteBoardMember(boardMember.user.id)}
                    >
                      <IconTrash size={18} />
                    </ActionIcon>
                  </>
                )}
              </Group>
            ))}
          </Stack>
        </ScrollArea>
      )}
    </>
  );
};
