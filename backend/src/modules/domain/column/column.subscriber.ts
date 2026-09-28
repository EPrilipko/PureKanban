import { EntityName, EventArgs, EventSubscriber } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';

import { NotificationService } from '@/modules/domain/notification/notification.service';
import { BoardMember } from '@/modules/domain/board/board-member/entities/board-member.entity';

import { Column } from './entities/column.entity';

@Injectable()
export class ColumnSubscriber implements EventSubscriber<Column> {
  public constructor(
    private readonly em: EntityManager,
    private readonly notificationService: NotificationService,
  ) {
    em.getEventManager().registerSubscriber(this);
  }

  public getSubscribedEntities(): EntityName<Column>[] {
    return [Column];
  }

  public async afterDelete(args: EventArgs<Column>): Promise<void> {
    const boardId = args.entity.board.id;

    const boardMembers = await this.em.find(BoardMember, {
      board: { id: boardId },
    });

    await Promise.all(
      boardMembers.map((boardMember) =>
        this.notificationService.flushUnreadCountUpdate(
          boardMember.user.id,
          boardId,
        ),
      ),
    );
  }
}
