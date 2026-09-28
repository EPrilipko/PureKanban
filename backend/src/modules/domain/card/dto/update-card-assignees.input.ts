import { ID, InputType, Field, Int } from '@nestjs/graphql';

import { BaseInput } from '@/common/dto/base-input.input';

@InputType()
export class UpdateCardAssigneesInput extends BaseInput {
  @Field(() => ID)
  id!: string;

  @Field(() => [Int], { nullable: true })
  assigneeIds!: number[] | null;
}
