import { Field, ID, InputType } from '@nestjs/graphql';

@InputType({ isAbstract: true })
export class BaseInput {
  @Field(() => ID)
  boardId!: string;
}
