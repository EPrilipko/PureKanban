import { InputType, Field } from '@nestjs/graphql';

import { BaseInput } from '@/common/dto/base-input.input';

@InputType()
export class SearchCardsInput extends BaseInput {
  @Field()
  query!: string;
}
