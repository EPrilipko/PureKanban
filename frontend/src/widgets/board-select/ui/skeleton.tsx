import { Skeleton, Group } from '@mantine/core';

import styles from './board-select.module.css';

export const BoardSelectSkeleton = () => (
  <Group gap="xs" px="xs" className={styles.selectSkeleton}>
    {/* Board circle */}
    <Skeleton width={8} height={8} circle animate={true} />

    {/* Board name */}
    <Skeleton height={14} width="65%" radius="xl" animate={true} />

    {/* Chevron */}
    <Skeleton height={10} width={10} radius="xs" style={{ marginLeft: 'auto' }} animate={true} />
  </Group>
);
