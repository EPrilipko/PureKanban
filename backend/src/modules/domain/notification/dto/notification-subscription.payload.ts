import { ByBoardMembersPayload } from '@/common/graphql/filters/byBoardMembers';

import { Notification } from '../entities/notification.entity';

export class NotificationSubscriptionPayload extends ByBoardMembersPayload {
  notification!: Notification;
}
