import { type FC } from 'react';
import { Box, Text, Stack, Skeleton } from '@mantine/core';
import { Spotlight } from '@mantine/spotlight';
import { IconSearch } from '@tabler/icons-react';

import type { CardRenderFragment } from '@/entities/card';

import { boardSpotlightStore } from './model';
import { useBoardSpotlight } from './libs';

interface Props {
  boardId: string;
  onCardClick: (cardId: string) => void;
}

export const BoardSpotlight: FC<Props> = ({ boardId, onCardClick }) => {
  const { query, setQuery, loading, searchCardsData } = useBoardSpotlight(boardId);

  return (
    <Spotlight.Root store={boardSpotlightStore} query={query} onQueryChange={setQuery}>
      <Spotlight.Search leftSection={<IconSearch size={20} />} placeholder="Поиск карточек..." />

      <Spotlight.ActionsList p="md">
        {loading ? (
          <Loader />
        ) : !searchCardsData?.searchCards.length ? (
          <Spotlight.Empty>
            <Text c="dimmed" ta="center">
              Ничего не найдено
            </Text>
          </Spotlight.Empty>
        ) : (
          <>
            {searchCardsData?.searchCards.map((card) => (
              <Spotlight.Action w="100%" pb="xs" key={card.id} onClick={() => onCardClick(card.id)}>
                <CardAction card={card} />
              </Spotlight.Action>
            ))}
          </>
        )}
      </Spotlight.ActionsList>
    </Spotlight.Root>
  );
};

interface CardActionProps {
  card: CardRenderFragment;
}

const CardAction: FC<CardActionProps> = ({ card }) => (
  <Box w="100%">
    <Text fw={500}>{card.name}</Text>

    <Text opacity={0.6} size="xs">
      {card.description}
    </Text>
  </Box>
);

const Loader = () => (
  <Stack gap="xs" w="100%">
    <Box w="100%" pb="xs">
      <Skeleton h={20} w="40%" radius="sm" mb={6} />
      <Skeleton h={14} w="75%" radius="sm" />
    </Box>

    <Box w="100%" pb="xs">
      <Skeleton h={20} w="55%" radius="sm" mb={6} />
      <Skeleton h={14} w="60%" radius="sm" />
    </Box>

    <Box w="100%" pb="xs">
      <Skeleton h={20} w="35%" radius="sm" />
    </Box>
  </Stack>
);
