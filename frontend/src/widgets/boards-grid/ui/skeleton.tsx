import { Skeleton, SimpleGrid } from '@mantine/core';

export const BoardsGridSkeleton = () => (
  <SimpleGrid cols={2}>
    <Skeleton h={200} />
    <Skeleton h={200} />
    <Skeleton h={200} />
    <Skeleton h={200} />
    <Skeleton h={200} />
  </SimpleGrid>
);
