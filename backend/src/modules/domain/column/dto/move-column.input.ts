import { Field, ID, InputType } from '@nestjs/graphql';

import { BaseInput } from '@/common/dto/base-input.input';

@InputType()
export class MoveColumnInput extends BaseInput {
  @Field(() => ID)
  id!: string;

  @Field(() => ID, { nullable: true })
  prevColumnId?: string;

  @Field(() => ID, { nullable: true })
  nextColumnId?: string;
}
