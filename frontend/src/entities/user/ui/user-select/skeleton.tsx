import { Skeleton, Stack } from '@mantine/core';

export function UserSelectSkeleton() {
  return (
    <Stack gap={4}>
      {/* Label */}
      <Skeleton height={21} width={60} radius="sm" />

      {/* Select */}
      <Skeleton height={36} radius="sm" />
    </Stack>
  );
}
