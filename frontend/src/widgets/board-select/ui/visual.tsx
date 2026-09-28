import { type FC, useMemo } from 'react';
import { type SelectProps, type ComboboxItem, Select, Group, Box, Text } from '@mantine/core';
// import { IconChevronDown } from '@tabler/icons-react';
import { useSuspenseQuery } from '@apollo/client/react';

import { type BoardRenderFragment } from '@/entities/board';

import { ALL_BOARDS } from '../api';

import styles from './board-select.module.css';

type BoardItem = ComboboxItem & { board: BoardRenderFragment };

export interface Props {
  value: string;
  onSelect: (boardId: string) => void;
}

export const BoardSelectVisual: FC<Props> = ({ value, onSelect }) => {
  const {
    data: { boards },
  } = useSuspenseQuery(ALL_BOARDS);

  // const currentBoard = boards.find((board) => board.id === value);

  const boardItems = useMemo(
    () =>
      boards.map(
        (board): BoardItem => ({
          label: board.name,
          value: board.id,
          board,
        }),
      ),
    [boards],
  );

  return (
    <Select
      variant="unstyled"
      allowDeselect={false}
      value={value}
      data={boardItems}
      className={styles.select}
      // rightSection={<IconChevronDown size={14} className={styles.chevron} />}
      rightSection={null}
      rightSectionPointerEvents="none"
      // leftSection={currentBoard && <ColorBox board={currentBoard} />}
      // leftSectionWidth={24}
      leftSectionWidth={0}
      comboboxProps={{
        width: 280,
        position: 'bottom-start',
        offset: 6,
        transitionProps: { transition: 'fade', duration: 100 },
      }}
      renderOption={RenderOption}
      onChange={(value) => {
        if (value) {
          onSelect(value);
        }
      }}
    />
  );
};

const RenderOption: SelectProps['renderOption'] = (item) => {
  const board = (item.option as BoardItem).board;

  return (
    <Group gap="xs" py={2}>
      <ColorBox board={board} />

      <Text size="sm" fw={500}>
        {board.name}
      </Text>
    </Group>
  );
};

interface ColorBoxProps {
  board: BoardRenderFragment;
}

const ColorBox: FC<ColorBoxProps> = ({ board }) => (
  <Box className={styles.colorBox} style={{ backgroundColor: board.color }} />
);
