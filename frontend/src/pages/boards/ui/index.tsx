import { Title, Box } from '@mantine/core';

import { BoardsGrid } from '@/widgets/boards-grid';

import { Header } from './header';

export const BoardsPage = () => {
  return (
    <>
      <Header />

      <Box pt="xl" pb="xl" pl="md" pr="md">
        <Title fw="700" mb="lg">
          Доски
        </Title>

        <BoardsGrid />
      </Box>
    </>
  );
};
