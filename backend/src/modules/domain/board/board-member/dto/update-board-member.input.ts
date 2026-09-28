import { InputType, Field, Int } from '@nestjs/graphql';

import { BaseInput } from '@/common/dto/base-input.input';

import { BoardMemberRole } from '../entities/board-member.entity';

@InputType()
export class UpdateBoardMemberInput extends BaseInput {
  @Field(() => Int)
  userId!: number;

  @Field(() => BoardMemberRole)
  role!: BoardMemberRole;
}
