import { Factory } from '@mikro-orm/seeder';
import { EntityData } from '@mikro-orm/core';
import { faker } from '@faker-js/faker';

import { User } from '@/modules/auth/user/entities/user.entity';

export class UserFactory extends Factory<User> {
  model = User;

  public definition(): EntityData<User> {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    };
  }
}
