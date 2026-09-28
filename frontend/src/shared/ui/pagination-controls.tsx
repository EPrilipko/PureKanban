import { type FC } from 'react';
import { clamp } from 'lodash';
import { Flex, Text, ActionIcon, NumberInput } from '@mantine/core';
import {
  IconChevronLeftPipe,
  IconChevronRightPipe,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';

interface Props {
  currentPage: number;
  nPages: number;
  gotoPage: (page: number) => void;
}

export const PaginationControls: FC<Props> = ({ currentPage, nPages, gotoPage }) => {
  const shouldRender = nPages >= 2;

  return (
    shouldRender && (
      <Flex gap="xs" align="center">
        <ActionIcon size={35} bd="0" disabled={currentPage <= 0} onClick={() => gotoPage(0)}>
          <IconChevronLeftPipe />
        </ActionIcon>

        <ActionIcon
          size={35}
          bd="0"
          disabled={currentPage <= 0}
          onClick={() => gotoPage(currentPage - 1)}
        >
          <IconChevronLeft />
        </ActionIcon>

        <NumberInput
          variant="unstyled"
          hideControls
          w={35}
          min={1}
          placeholder="#"
          styles={{
            input: {
              padding: 0,
              textAlign: 'center',
              background: 'red',
              color: 'var(--mantine-color-white)',
            },
          }}
          max={nPages}
          value={currentPage + 1}
          onBlur={(event) => gotoPage(clamp(+event.target.value - 1, 0, nPages - 1))}
        />

        <Text>of</Text>

        <NumberInput
          variant="unstyled"
          readOnly
          hideControls
          w={35}
          min={1}
          placeholder="#"
          styles={{
            input: {
              padding: 0,
              textAlign: 'center',
              border: '1px solid red',
            },
          }}
          max={nPages}
          value={nPages}
        />

        <ActionIcon
          size={35}
          bd="0"
          disabled={currentPage >= nPages - 1}
          onClick={() => gotoPage(currentPage + 1)}
        >
          <IconChevronRight />
        </ActionIcon>

        <ActionIcon
          size={35}
          bd="0"
          disabled={currentPage >= nPages - 1}
          onClick={() => gotoPage(nPages - 1)}
        >
          <IconChevronRightPipe />
        </ActionIcon>
      </Flex>
    )
  );
};
