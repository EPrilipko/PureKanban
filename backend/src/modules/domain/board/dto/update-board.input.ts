import { InputType, Field } from '@nestjs/graphql';
import { GraphQLHexColorCode } from 'graphql-scalars';

import { BaseInput } from '@/common/dto/base-input.input';

@InputType()
export class UpdateBoardInput extends BaseInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => GraphQLHexColorCode, { nullable: true })
  color?: string;
}
