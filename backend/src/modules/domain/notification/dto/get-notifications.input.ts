import { Field, InputType, IntersectionType } from '@nestjs/graphql';

import { BaseInput } from '@/common/dto/base-input.input';

import { PaginationArgs } from '@/lib/pagination/cursor';

@InputType()
export class GetNotificationsInput extends IntersectionType(
  BaseInput,
  PaginationArgs,
) {
  @Field(() => Boolean, { nullable: true })
  onlyUnread!: boolean | null;
}
