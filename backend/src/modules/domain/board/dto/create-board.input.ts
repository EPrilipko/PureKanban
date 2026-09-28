import { InputType, Field } from '@nestjs/graphql';
import { GraphQLHexColorCode } from 'graphql-scalars';

@InputType()
export class CreateBoardInput {
  @Field()
  name!: string;

  @Field(() => GraphQLHexColorCode)
  color!: string;
}
