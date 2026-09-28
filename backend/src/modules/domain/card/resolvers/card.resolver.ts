import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';

import { Public, GqlWsAuthGuard } from '@/modules/auth';

import { byBoard } from '@/common/graphql/filters/byBoard';

import { CurrentUser, type IUserSession } from '@/modules/auth';
import {
  BoardMembershipGuard,
  BoardMembershipRead,
  BoardMembershipWrite,
} from '@/modules/domain/board/board-member';

import { Card } from '../entities/card.entity';
import { CardService } from '../card.service';
import {
  CreateCardInput,
  UpdateCardInput,
  MoveCardInput,
  MoveCardResponse,
  SearchCardsInput,
  UpdateCardOwnerInput,
  UpdateCardAssigneesInput,
  CardSubscriptionPayload,
  CardSubscriptionInput,
  CardByIdInput,
} from '../dto';

@UseGuards(BoardMembershipGuard)
@Resolver(() => Card)
export class CardResolver {
  public constructor(
    private readonly cardService: CardService,
    private readonly pubSub: PubSub,
  ) {}

  @BoardMembershipRead()
  @Query(() => Card)
  public cardById(
    @Args('input', { type: () => CardByIdInput }) input: CardByIdInput,
  ): Promise<Card> {
    return this.cardService.getById(input.cardId);
  }

  @BoardMembershipRead()
  @Query(() => [Card])
  public cardsByBoard(
    @Args('boardId', { type: () => ID }) boardId: string,
  ): Promise<Card[]> {
    return this.cardService.getAllByBoard(boardId);
  }

  @BoardMembershipRead()
  @Query(() => [Card])
  public searchCards(@Args('input') input: SearchCardsInput): Promise<Card[]> {
    return this.cardService.search(input);
  }

  @BoardMembershipWrite()
  @Mutation(() => Card)
  public async createCard(
    @CurrentUser() userSession: IUserSession,
    @Args('input') input: CreateCardInput,
  ): Promise<Card> {
    return this.cardService.create(userSession.id, input);
  }

  @BoardMembershipWrite()
  @Mutation(() => Card)
  public async updateCard(
    @CurrentUser() userSession: IUserSession,
    @Args('input') input: UpdateCardInput,
  ): Promise<Card> {
    return this.cardService.update(userSession.id, input);
  }

  @BoardMembershipWrite()
  @Mutation(() => Card)
  public async updateCardOwner(
    @CurrentUser() userSession: IUserSession,
    @Args('input') input: UpdateCardOwnerInput,
  ): Promise<Card> {
    return this.cardService.updateOwner(userSession.id, input);
  }

  @BoardMembershipWrite()
  @Mutation(() => Card)
  public async updateCardAssignees(
    @CurrentUser() userSession: IUserSession,
    @Args('input') input: UpdateCardAssigneesInput,
  ): Promise<Card> {
    return this.cardService.updateAssignees(userSession.id, input);
  }

  @BoardMembershipWrite()
  @Mutation(() => MoveCardResponse)
  public async moveCard(
    @Args('input') input: MoveCardInput,
  ): Promise<MoveCardResponse> {
    return this.cardService.moveCard(input);
  }

  @Public()
  @UseGuards(GqlWsAuthGuard)
  @BoardMembershipRead()
  @Subscription(() => Card, {
    filter(
      payload: CardSubscriptionPayload,
      variables: { input: CardSubscriptionInput },
    ) {
      return byBoard(payload, variables);
    },
    resolve(payload: CardSubscriptionPayload) {
      return payload.card;
    },
  })
  public cardCreated(@Args('input', { type: () => CardSubscriptionInput }) _) {
    return this.pubSub.asyncIterableIterator('cardCreated');
  }

  @Public()
  @UseGuards(GqlWsAuthGuard)
  @BoardMembershipRead()
  @Subscription(() => MoveCardResponse, {
    filter(
      payload: MoveCardResponse,
      variables: { input: CardSubscriptionInput },
    ) {
      return byBoard(payload, variables);
    },
    resolve(payload: CardSubscriptionPayload) {
      return payload;
    },
  })
  public cardMoved(@Args('input', { type: () => CardSubscriptionInput }) _) {
    return this.pubSub.asyncIterableIterator('cardMoved');
  }

  @Public()
  @UseGuards(GqlWsAuthGuard)
  @BoardMembershipRead()
  @Subscription(() => Card, {
    filter(
      payload: CardSubscriptionPayload,
      variables: { input: CardSubscriptionInput },
    ) {
      return byBoard(payload, variables);
    },
    resolve(payload: CardSubscriptionPayload) {
      return payload.card;
    },
  })
  public cardUpdated(@Args('input', { type: () => CardSubscriptionInput }) _) {
    return this.pubSub.asyncIterableIterator('cardUpdated');
  }
}
