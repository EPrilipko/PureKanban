import { ObjectType } from '@nestjs/graphql';

import { CursorPaginated } from '@/lib/pagination/cursor';

import { Notification } from './notification.entity';

@ObjectType()
export class NotificationPaginated extends CursorPaginated(Notification) {}
