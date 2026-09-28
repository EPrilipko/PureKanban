import { Field, InputType } from '@nestjs/graphql';

import { BaseInput } from '@/common/dto/base-input.input';

@InputType()
export class CardCommentSubscriptionInput extends BaseInput {
  @Field()
  cardId!: string;
}
