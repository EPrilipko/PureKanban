import { defineEntity, OptionalProps, p } from '@mikro-orm/core';
import { ObjectType, registerEnumType, Field, ID } from '@nestjs/graphql';
import { GraphQLDateTime } from 'graphql-scalars';

import { User } from '@/modules/auth/user/entities/user.entity';
import { Board } from '@/modules/domain/board/entities/board.entity';

export enum BoardMemberRole {
  Author = 'Author',
  Admin = 'Admin',
  User = 'User',
}

export const BoardMemberSchema = defineEntity({
  name: 'BoardMember',
  properties: {
    id: p.integer().primary().autoincrement(),
    user: () =>
      p.manyToOne(User).primary().inversedBy('boardMemberships').eager(),
    board: () =>
      p
        .manyToOne(Board)
        .primary()
        .inversedBy('boardMembers')
        .deleteRule('cascade'),
    role: p.enum(BoardMemberRole),
    createdAt: p.datetime().onCreate(() => new Date()),
  },
});

@ObjectType()
export class BoardMember extends BoardMemberSchema.class {
  [OptionalProps]?: 'id' | 'createdAt';

  @Field(() => ID)
  id!: number;

  @Field(() => User)
  user!: User;

  @Field(() => Board)
  board!: Board;

  @Field(() => BoardMemberRole)
  role!: BoardMemberRole;

  @Field(() => GraphQLDateTime)
  createdAt!: Date;
}

BoardMemberSchema.setClass(BoardMember);
registerEnumType(BoardMemberRole, { name: 'BoardMemberRole' });
