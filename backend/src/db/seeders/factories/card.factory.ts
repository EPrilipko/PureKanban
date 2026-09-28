import { Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { EntityData } from '@mikro-orm/core';

import { Card } from '@/modules/domain/card/entities/card.entity';

export class CardFactory extends Factory<Card> {
  model = Card;

  public definition(): EntityData<Card> {
    return {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
    };
  }
}
