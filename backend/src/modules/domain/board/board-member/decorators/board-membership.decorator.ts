import { SetMetadata } from '@nestjs/common';

import { BoardMemberRole } from '../entities/board-member.entity';

export const BOARD_MEMBERSHIP_KEY = 'board-membership';

export const BoardMembershipRead = () =>
  SetMetadata(BOARD_MEMBERSHIP_KEY, BoardMemberRole.User);
export const BoardMembershipWrite = () =>
  SetMetadata(BOARD_MEMBERSHIP_KEY, BoardMemberRole.Admin);
