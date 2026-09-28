import { defineEntity, p } from '@mikro-orm/core';
import { ID, ObjectType, Field } from '@nestjs/graphql';
import { v4 } from 'uuid';

import { User } from '@/modules/auth/user/entities/user.entity';

export const UserSessionSchema = defineEntity({
  name: 'UserSession',
  properties: {
    id: p
      .uuid()
      .primary()
      .onCreate(() => v4()),
    refreshTokenHash: p.string(),
    deviceId: p.string(),
    user: () => p.manyToOne(User).inversedBy('sessions'),
  },
  uniques: [
    {
      properties: ['user', 'deviceId'],
      name: 'unique_user_per_device',
    },
  ],
});

@ObjectType()
export class UserSession extends UserSessionSchema.class {
  @Field(() => ID)
  id!: string;

  @Field()
  refreshTokenHash!: string;

  @Field()
  deviceId!: string;

  @Field(() => User)
  user!: User;
}

UserSessionSchema.setClass(UserSession);
