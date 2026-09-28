import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { GraphQLHexColorCode } from 'graphql-scalars';

import { BaseInput } from '@/common/dto/base-input.input';

@InputType()
export class UpdateColumnInput extends BaseInput {
  @Field(() => ID)
  id!: string;

  @Field({ nullable: true })
  name?: string;

  @Field(() => GraphQLHexColorCode, { nullable: true })
  color?: string;

  @Field(() => Int, { nullable: true })
  maxCardsCount?: number;
}
