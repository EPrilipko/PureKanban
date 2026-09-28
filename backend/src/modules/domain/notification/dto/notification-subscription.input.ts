import { Field, InputType } from '@nestjs/graphql';

import { BaseInput } from '@/common/dto/base-input.input';

@InputType()
export class NotificationSubscriptionInput extends BaseInput {
  @Field(() => Boolean, { nullable: true })
  onlyUnread!: boolean | null;
}
