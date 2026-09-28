import { Timeline, Skeleton, Stack } from '@mantine/core';

export const CardHistoryListSkeleton = () => {
  return (
    <Timeline>
      {[0, 1].map((index) => (
        <CardHistoryItemSkeleton key={index} />
      ))}
    </Timeline>
  );
};

export const CardHistoryItemSkeleton = () => (
  <Timeline.Item
    // Имитируем заголовок (например, "Добавлен комментарий")
    title={<Skeleton height={16} width={140} radius="sm" mb={6} />}
  >
    <Stack gap={6}>
      {/* Имитируем дату (например, "23.07.2026 в 16:17") */}
      <Skeleton height={12} width={100} radius="sm" />

      {/* Имитируем текстовый контент комментария <Code> */}
      <Skeleton height={40} width="100%" radius="sm" mt={4} />
    </Stack>
  </Timeline.Item>
);
