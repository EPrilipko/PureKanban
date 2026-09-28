import { useMutation, useSubscription } from '@apollo/client/react';

import { useCursorPaginatedQuery } from '@/shared/libs';

import {
  READ_NOTIFICATION,
  NOTIFICATION_CREATED,
  NOTIFICATION_UPDATED,
  type NotificationEdge,
} from '@/entities/notification';

import { GET_NOTIFICATIONS } from '../api';

const BATCH_SIZE = 10;

export const useNotificationsList = (boardId: string, onlyUnread: boolean) => {
  const [readNotificationMutation] = useMutation(READ_NOTIFICATION);

  const {
    edges: notifications,
    isFetching,
    fetchMore,
  } = useCursorPaginatedQuery(
    GET_NOTIFICATIONS,
    { input: { boardId, onlyUnread } },
    BATCH_SIZE,
    ({ notifications: { edges, pageInfo } }) => ({
      edges,
      hasNextPage: pageInfo.hasNextPage,
      endCursor: pageInfo.endCursor,
    }),
  );

  const readNotification = (id: string) =>
    readNotificationMutation({
      variables: { boardId, id },
    });

  useSubscription(NOTIFICATION_CREATED, {
    variables: { input: { boardId, onlyUnread } },
    onData: ({ client, data }) => {
      const newNotification = data.data?.notificationCreated;

      if (!newNotification) {
        return;
      }

      client.cache.modify({
        fields: {
          notifications(existingData, { toReference, readField }) {
            if (!existingData) return existingData;

            const isAlreadyExists = existingData.edges.some(
              (edge: NotificationEdge) => readField('id', edge.node) === newNotification.id,
            );
            if (isAlreadyExists) return existingData;

            const newEdge = {
              __typename: 'Notification',
              cursor: null, // new edge is appended at the start of list, so its cursor can ba arbitrary
              node: toReference(newNotification),
            };

            return {
              ...existingData,
              edges: [newEdge, ...existingData.edges],
            };
          },
        },
      });
    },
  });

  useSubscription(NOTIFICATION_UPDATED, {
    variables: { input: { boardId } },
    onData: ({ client, data }) => {
      const updatedNotification = data.data?.notificationUpdated;

      if (!updatedNotification) {
        return;
      }

      if (onlyUnread && updatedNotification.isRead) {
        client.cache.modify({
          fields: {
            notifications(existingData, { readField }) {
              if (!existingData) return existingData;

              const updatedEdges = existingData.edges.filter((edge: NotificationEdge) => {
                const nodeRef = readField('node', edge) as Readonly<Notification>;
                const isRead = readField('isRead', nodeRef);

                return !isRead;
              });

              return {
                ...existingData,
                edges: updatedEdges,
              };
            },
          },
        });
      }
    },
  });

  return { notifications, isFetching, fetchMore, readNotification };
};
