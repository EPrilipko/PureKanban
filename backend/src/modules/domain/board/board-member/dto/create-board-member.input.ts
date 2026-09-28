import { InputType, Field, Int } from '@nestjs/graphql';

import { BaseInput } from '@/common/dto/base-input.input';

import { BoardMemberRole } from '../entities/board-member.entity';

@InputType()
export class CreateBoardMemberInput extends BaseInput {
  @Field(() => Int)
  userId!: number;

  @Field(() => BoardMemberRole)
  role!: BoardMemberRole;
}
