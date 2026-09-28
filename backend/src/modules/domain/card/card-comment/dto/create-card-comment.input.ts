import { Field, ID, InputType } from '@nestjs/graphql';

import { BaseInput } from '@/common/dto/base-input.input';

@InputType()
export class CreateCardCommentInput extends BaseInput {
  @Field(() => ID)
  cardId!: string;

  @Field()
  text!: string;
}
