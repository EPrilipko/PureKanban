import { Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { EntityData } from '@mikro-orm/core';

import { Column } from '@/modules/domain/column/entities/column.entity';

export class ColumnFactory extends Factory<Column> {
  model = Column;

  public definition(): EntityData<Column> {
    return {
      name: faker.company.catchPhraseNoun(),
      color: faker.color.rgb(),
      maxCardsCount: 5,
    };
  }
}
