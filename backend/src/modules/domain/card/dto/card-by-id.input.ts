import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CardByIdInput {
  @Field(() => ID)
  boardId!: string;

  @Field(() => ID)
  cardId!: string;
}
