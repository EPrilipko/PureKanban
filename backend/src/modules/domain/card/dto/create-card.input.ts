import { InputType, Field } from '@nestjs/graphql';

import { BaseInput } from '@/common/dto/base-input.input';

@InputType()
export class CreateCardInput extends BaseInput {
  @Field()
  columnId!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  description?: string;
}
