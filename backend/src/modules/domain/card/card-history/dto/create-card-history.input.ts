import { InputType, Field } from '@nestjs/graphql';

import { BaseInput } from '@/common/dto/base-input.input';

import { CardHistoryAction } from '../entities/card-history.entity';
import { CardHistoryPayload } from '../entities/card-history-payload.entity';

@InputType()
export class CreateCardHistoryInput extends BaseInput {
  @Field()
  cardId!: string;

  @Field(() => CardHistoryAction)
  action!: CardHistoryAction;

  @Field(() => CardHistoryPayload)
  payload!: typeof CardHistoryPayload;
}
