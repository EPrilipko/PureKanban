import { ByBoardMembersPayload } from '@/common/graphql/filters/byBoardMembers';

import { Board } from '../entities/board.entity';

export class BoardSubscriptionPayload extends ByBoardMembersPayload {
  board!: Board;
}
