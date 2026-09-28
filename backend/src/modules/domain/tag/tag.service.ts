import { Injectable } from '@nestjs/common';
import { EntityManager, wrap } from '@mikro-orm/postgresql';

import { PubSub } from 'graphql-subscriptions';

import { Board } from '@/modules/domain/board/entities/board.entity';

import { Tag } from './entities/tag.entity';
import { CreateTagInput, UpdateTagInput, TagSubscriptionPayload } from './dto';

@Injectable()
export class TagService {
  public constructor(
    private readonly em: EntityManager,
    private readonly pubSub: PubSub,
  ) {}

  public async getAll(): Promise<Tag[]> {
    return this.em.findAll(Tag, { populate: ['cards'] });
  }

  public async getById(id: string): Promise<Tag> {
    return this.em.findOneOrFail(Tag, id);
  }

  public async create(input: CreateTagInput): Promise<Tag> {
    const board = await this.em.findOneOrFail(Board, input.boardId);

    const tag = this.em.create(Tag, {
      name: input.name,
      color: input.color,
      board,
    });

    await this.em.persist(tag).flush();

    await this.pubSub.publish('tagCreated', {
      boardId: input.boardId,
      tag,
    } satisfies TagSubscriptionPayload);

    return tag;
  }

  public async update(input: UpdateTagInput): Promise<Tag> {
    const tag = await this.em.findOneOrFail(Tag, input.id);

    wrap(tag).assign(
      {
        name: input.name,
        color: input.color,
      },
      { ignoreUndefined: true },
    );

    await this.pubSub.publish('tagUpdated', {
      boardId: input.boardId,
      tag,
    } satisfies TagSubscriptionPayload);

    await this.em.flush();

    return tag;
  }

  public async deleteOne(id: string): Promise<Tag> {
    const tag = await this.em.findOneOrFail(Tag, id);

    await this.pubSub.publish('tagDeleted', {
      boardId: tag.board.id,
      tag,
    } satisfies TagSubscriptionPayload);

    await this.em.remove(tag).flush();

    return tag;
  }
}
