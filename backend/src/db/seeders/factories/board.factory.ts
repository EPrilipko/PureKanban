import { Factory } from '@mikro-orm/seeder';
import { EntityData } from '@mikro-orm/core';
import { faker } from '@faker-js/faker';

import { nanoid } from '@/lib/nanoid';
import { Board } from '@/modules/domain/board/entities/board.entity';

export class BoardFactory extends Factory<Board> {
  model = Board;

  public definition(): EntityData<Board> {
    return {
      id: nanoid(),
      name: faker.company.name(),
      color: faker.color.rgb(),
    };
  }
}
