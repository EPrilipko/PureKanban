import { ObjectType, Field, createUnionType } from '@nestjs/graphql';

import { PartialCard } from '@/modules/domain/card/entities/card.entity';
import { CardComment } from '@/modules/domain/card/card-comment/entities/card-comment.entity';
import { User } from '@/modules/auth/user/entities/user.entity';

import { CardHistoryAction } from './card-history.entity';

@ObjectType()
export class CardCreatedPayload {
  @Field(() => CardHistoryAction)
  action!: CardHistoryAction.Created;
}

@ObjectType()
export class CardUpdatedPayload {
  @Field(() => CardHistoryAction)
  action!: CardHistoryAction.Updated;

  @Field(() => PartialCard)
  beforeCard!: PartialCard;

  @Field(() => PartialCard)
  afterCard!: PartialCard;
}

@ObjectType()
export class CardOwnerUpdatedPayload {
  @Field(() => CardHistoryAction)
  action!: CardHistoryAction.OwnerUpdated;

  @Field(() => User, { nullable: true })
  beforeOwner!: User | null;

  @Field(() => User, { nullable: true })
  afterOwner!: User | null;
}

@ObjectType()
export class CardAssigneesUpdatedPayload {
  @Field(() => CardHistoryAction)
  action!: CardHistoryAction.AssigneesUpdated;

  @Field(() => [User])
  beforeAssignees!: User[];

  @Field(() => [User])
  afterAssignees!: User[];
}

@ObjectType()
export class CardCommentAddedPayload {
  @Field(() => CardHistoryAction)
  action!: CardHistoryAction.CommentAdded;

  @Field(() => CardComment)
  comment!: CardComment;
}

export const CardHistoryPayload = createUnionType({
  name: 'CardHistoryPayload',
  types: () =>
    [
      CardCreatedPayload,
      CardUpdatedPayload,
      CardOwnerUpdatedPayload,
      CardAssigneesUpdatedPayload,
      CardCommentAddedPayload,
    ] as const,
  resolveType: (value) => {
    switch ((value as typeof CardHistoryPayload).action) {
      case CardHistoryAction.Created:
        return CardCreatedPayload;
      case CardHistoryAction.Updated:
        return CardUpdatedPayload;
      case CardHistoryAction.CommentAdded:
        return CardCommentAddedPayload;
      case CardHistoryAction.OwnerUpdated:
        return CardOwnerUpdatedPayload;
      case CardHistoryAction.AssigneesUpdated:
        return CardAssigneesUpdatedPayload;
      default:
        return null;
    }
  },
});
