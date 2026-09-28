import { ID, InputType, Field, Int } from '@nestjs/graphql';

import { BaseInput } from '@/common/dto/base-input.input';

@InputType()
export class UpdateCardOwnerInput extends BaseInput {
  @Field(() => ID)
  id!: string;

  @Field(() => Int, { nullable: true })
  ownerId!: number | null;
}
