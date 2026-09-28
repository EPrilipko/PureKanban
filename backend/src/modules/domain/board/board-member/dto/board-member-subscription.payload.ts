import { ByBoardMembersPayload } from '@/common/graphql/filters/byBoardMembers';

import { BoardMember } from '../entities/board-member.entity';

export class BoardMemberSubscriptionPayload extends ByBoardMembersPayload {
  boardMember!: BoardMember;
}
