import { Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { EntityData } from '@mikro-orm/core';

import { Tag } from '@/modules/domain/tag/entities/tag.entity';

export class TagFactory extends Factory<Tag> {
  model = Tag;

  public definition(): EntityData<Tag> {
    return {
      name: faker.food.fruit(),
      color: faker.color.rgb(),
    };
  }
}
