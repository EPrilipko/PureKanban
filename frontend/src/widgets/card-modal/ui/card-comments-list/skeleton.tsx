import { Stack, Group, Skeleton } from '@mantine/core';

export const CardCommentsListSkeleton = () => (
  <Stack gap="md">
    {[1, 2].map((id) => (
      <div key={id}>
        <Group gap="2xs" mb="xs">
          <Skeleton height={32} circle /> {/* Аватар автора */}
          <Skeleton height={14} width={100} radius="xs" /> {/* Имя Фамилия */}
          <Skeleton height={12} width={120} radius="xs" /> {/* Дата */}
        </Group>
        {/* Текст комментария с отступом мл={40} как в оригинале */}
        <Stack gap="5xs" style={{ paddingLeft: 40 }}>
          <Skeleton height={14} width="90%" radius="xs" />
          <Skeleton height={14} width="40%" radius="xs" />
        </Stack>
      </div>
    ))}
  </Stack>
);
