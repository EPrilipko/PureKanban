import { InputType, Field, Int } from '@nestjs/graphql';
import { GraphQLHexColorCode } from 'graphql-scalars';

import { BaseInput } from '@/common/dto/base-input.input';

@InputType()
export class CreateColumnInput extends BaseInput {
  @Field()
  name!: string;

  @Field(() => GraphQLHexColorCode)
  color!: string;

  @Field(() => Int, { nullable: true })
  maxCardsCount?: number;
}
