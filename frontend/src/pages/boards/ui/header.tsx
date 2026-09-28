import { Flex } from '@mantine/core';

import { PageHeader } from '@/entities/layout';

import { UserMenu } from '@/widgets/user-menu';

import { CreateBoardButton } from '@/features/board';

export const Header = () => (
  <PageHeader>
    <Flex h="100%" pl="md" pr="md" justify="space-between" align="center">
      <CreateBoardButton />

      <UserMenu />
    </Flex>
  </PageHeader>
);
