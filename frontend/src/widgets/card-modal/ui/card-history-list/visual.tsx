import type { FC, ReactNode } from 'react';
import { Timeline, Text, Group, Code, ScrollArea, Flex, Pill } from '@mantine/core';
import dayjs from 'dayjs';
import { IconArrowNarrowRightDashed } from '@tabler/icons-react';

import {
  type CardUpdatedPayload,
  type CardOwnerUpdatedPayload,
  type CardCommentAddedPayload,
  type PartialCardRenderFragment,
} from '@/entities/card-history';
import { UserAvatar } from '@/entities/user';

import {
  type CardAssigneesUpdatedPayload,
  type CardHistoryRenderFragment,
  CardHistoryAction,
} from '@/entities/card-history';

import { useCardHistoryList } from '../../libs';
import { CardHistoryItemSkeleton } from './skeleton';

export interface Props {
  boardId: string;
  cardId: string;
}

const PartialCardFields: Partial<Record<keyof PartialCardRenderFragment, string>> = {
  name: 'название',
  description: 'описание',
  tags: 'теги',
};

export const CardHistoryListVisual: FC<Props> = ({ boardId, cardId }) => {
  const { historyItems, isFetching, fetchMore } = useCardHistoryList(boardId, cardId);

  return (
    <>
      <ScrollArea.Autosize maw="100%" mah={400} onBottomReached={fetchMore}>
        <Timeline>
          {historyItems.map((item) => (
            <Timeline.Item
              title={<TimelineItemTitle item={item.node} />}
              key={item.node.id}
              bullet={<UserAvatar user={item.node.author} size={24} />}
            >
              <Text c="dimmed" size="xs">
                {dayjs(item.node.createdAt).format('DD.MM.YYYY в HH:mm')}
              </Text>

              <TimelineItemContent item={item.node} />
            </Timeline.Item>
          ))}

          {isFetching && [0, 1].map((i) => <CardHistoryItemSkeleton key={i} />)}
        </Timeline>
      </ScrollArea.Autosize>
    </>
  );
};

const TimelineItemTitle: FC<{ item: CardHistoryRenderFragment }> = ({ item }) => {
  switch (item.payload.action) {
    case CardHistoryAction.Created:
      return 'Карточка создана';
    case CardHistoryAction.CommentAdded:
      return 'Добавлен комментарий';
    case CardHistoryAction.OwnerUpdated: {
      const tPayload = item.payload as CardOwnerUpdatedPayload;

      return tPayload.afterOwner && !tPayload.beforeOwner
        ? 'Исполнитель назначен'
        : !tPayload.afterOwner && tPayload.beforeOwner
          ? 'Исполнитель удален'
          : 'Исполнитель изменен';
    }
    case CardHistoryAction.AssigneesUpdated:
      return 'Участники изменены';
    case CardHistoryAction.Updated: {
      const tPayload = item.payload as CardUpdatedPayload;
      const diffsFields = getUpdateDiffFields(tPayload);

      return `Изменены поля (${diffsFields.map((field) => PartialCardFields[field]).join(', ')})`;
    }
  }
};

const TimelineItemContent: FC<{ item: CardHistoryRenderFragment }> = ({ item }) => {
  switch (item.payload.action) {
    case CardHistoryAction.Created:
      return null;
    case CardHistoryAction.CommentAdded: {
      const tPayload = item.payload as CardCommentAddedPayload;

      return <Code>{tPayload.comment.text}</Code>;
    }
    case CardHistoryAction.OwnerUpdated: {
      const tPayload = item.payload as CardOwnerUpdatedPayload;
      return tPayload.afterOwner && <UserAvatar user={tPayload.afterOwner} />;
    }
    case CardHistoryAction.AssigneesUpdated: {
      const tPayload = item.payload as CardAssigneesUpdatedPayload;
      return (
        <Group gap="2xs">
          {tPayload.afterAssignees?.length ? (
            tPayload.afterAssignees.map((assignee) => (
              <UserAvatar key={assignee.id} user={assignee} />
            ))
          ) : (
            <Text size="sm">Участники не заданы</Text>
          )}
        </Group>
      );
    }
    case CardHistoryAction.Updated: {
      const tPayload = item.payload as CardUpdatedPayload;
      const diffsFields = getUpdateDiffFields(tPayload);

      return diffsFields.map((field) => (
        <Flex gap="2xs" align="center" key={field} wrap="wrap">
          {diffsFields.length !== 1 && (
            <>
              {PartialCardFields[field]}:<br />
            </>
          )}
          <FieldValue beforeFieldTheme payload={tPayload.beforeCard} field={diffsFields[0]} />
          <IconArrowNarrowRightDashed />
          <FieldValue payload={tPayload.afterCard} field={diffsFields[0]} />
        </Flex>
      ));
    }
    default:
      return null;
  }
};

interface FieldValueProps {
  beforeFieldTheme?: boolean;
  payload: PartialCardRenderFragment;
  field: keyof PartialCardRenderFragment;
}

const FieldValue: FC<FieldValueProps> = ({ beforeFieldTheme, payload, field }) => {
  let children: ReactNode;

  switch (field) {
    case 'tags':
      if (payload.tags?.length) {
        return (
          <Flex gap="3xs">
            {payload.tags.map((tag) => (
              <Pill
                key={tag.id}
                size="xs"
                style={{ textDecoration: beforeFieldTheme ? 'line-through' : undefined }}
                bg={tag.color}
              >
                {tag.name}
              </Pill>
            ))}
          </Flex>
        );
      }

      break;

    case 'name':
    case 'description':
    default:
      children = payload[field];
      break;
  }

  return (
    <Code style={{ textDecoration: beforeFieldTheme ? 'line-through' : undefined }}>
      {children || 'Не задано'}
    </Code>
  );
};

const getUpdateDiffFields = (payload: CardUpdatedPayload): (keyof PartialCardRenderFragment)[] =>
  (
    Object.keys({
      ...payload.beforeCard,
      ...payload.afterCard,
    }) as [keyof PartialCardRenderFragment]
  ).filter((key) => payload.beforeCard[key] !== payload.afterCard[key]);
