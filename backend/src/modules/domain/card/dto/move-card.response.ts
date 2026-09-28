import { ObjectType, Field } from '@nestjs/graphql';

import { Column } from '@/modules/domain/column/entities/column.entity';

import { Card } from '../entities/card.entity';

@ObjectType()
export class MoveCardResponse {
  @Field()
  boardId!: string;

  @Field(() => Card)
  card!: Card;

  @Field(() => Column)
  sourceColumn!: Column;

  @Field(() => Column)
  targetColumn!: Column;
}
