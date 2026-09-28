import { Field, ID, InputType } from '@nestjs/graphql';

import { BaseInput } from '@/common/dto/base-input.input';

@InputType()
export class UpdateCardCommentInput extends BaseInput {
  @Field(() => ID)
  id!: string;

  @Field()
  text!: string;
}
