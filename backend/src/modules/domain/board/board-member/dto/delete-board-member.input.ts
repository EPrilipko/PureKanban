import { InputType, Field, Int } from '@nestjs/graphql';

import { BaseInput } from '@/common/dto/base-input.input';

@InputType()
export class DeleteBoardMemberInput extends BaseInput {
  @Field(() => Int)
  userId!: number;
}
