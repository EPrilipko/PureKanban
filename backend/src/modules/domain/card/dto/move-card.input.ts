import { Field, ID, InputType } from '@nestjs/graphql';

import { BaseInput } from '@/common/dto/base-input.input';

@InputType()
export class MoveCardInput extends BaseInput {
  @Field(() => ID)
  cardId!: string;

  @Field(() => ID, { nullable: true })
  columnId?: string;

  @Field(() => ID, { nullable: true })
  prevCardId?: string;

  @Field(() => ID, { nullable: true })
  nextCardId?: string;
}
