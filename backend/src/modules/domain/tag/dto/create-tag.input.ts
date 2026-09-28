import { InputType, Field } from '@nestjs/graphql';
import { GraphQLHexColorCode } from 'graphql-scalars';

import { BaseInput } from '@/common/dto/base-input.input';

@InputType()
export class CreateTagInput extends BaseInput {
  @Field()
  name!: string;

  @Field(() => GraphQLHexColorCode)
  color!: string;
}
