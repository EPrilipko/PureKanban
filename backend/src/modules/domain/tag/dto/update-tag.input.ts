import { InputType, Field, ID } from '@nestjs/graphql';
import { GraphQLHexColorCode } from 'graphql-scalars';

import { BaseInput } from '@/common/dto/base-input.input';

@InputType()
export class UpdateTagInput extends BaseInput {
  @Field(() => ID)
  id!: string;

  @Field({ nullable: true })
  name?: string;

  @Field(() => GraphQLHexColorCode, { nullable: true })
  color?: string;
}
