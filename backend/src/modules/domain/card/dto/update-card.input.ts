import { ID, InputType, Field } from '@nestjs/graphql';

import { BaseInput } from '@/common/dto/base-input.input';

@InputType()
export class UpdateCardInput extends BaseInput {
  @Field(() => ID)
  id!: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [String], { nullable: true })
  tagIds?: string[];
}
