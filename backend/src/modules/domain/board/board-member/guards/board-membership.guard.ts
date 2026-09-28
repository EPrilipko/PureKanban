import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { EntityManager } from '@mikro-orm/postgresql';
import { Reflector } from '@nestjs/core';
import { GraphQLError } from 'graphql/error';

import { GraphqlErrorCode } from '@/common/graphql/errors.enum';

import { getCurrentUser } from '@/modules/auth/helpers/get-current-user.helper';
import { IUserSession } from '@/modules/auth';

import { BOARD_MEMBERSHIP_KEY } from '../decorators/board-membership.decorator';
import { BoardMember, BoardMemberRole } from '../entities/board-member.entity';

interface BoardArgs {
  boardId?: string;
  input?: {
    boardId?: string;
  };
}

@Injectable()
export class BoardMembershipGuard implements CanActivate {
  public constructor(
    private readonly reflector: Reflector,
    private readonly em: EntityManager,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const em = this.em.fork();

    const requiredRole: BoardMemberRole | null =
      this.reflector.get(BOARD_MEMBERSHIP_KEY, context.getHandler()) || null;

    const user = getCurrentUser(context) as IUserSession;

    const args = GqlExecutionContext.create(context).getArgs<BoardArgs>() ?? {};
    const boardId: string | undefined = args.boardId ?? args.input?.boardId;

    if (!boardId) {
      throw new GraphQLError(`Missing boardId in request`, {
        extensions: {
          code: GraphqlErrorCode.BadRequest,
        },
      });
    }

    const userBoardMembership = await em.findOne(BoardMember, {
      board: boardId,
      user: user.id,
    });

    if (!userBoardMembership) {
      throw new GraphQLError(`You do not have permission to read this board`, {
        extensions: {
          code: GraphqlErrorCode.BoardReadDenied,
        },
      });
    }

    if (userBoardMembership.role === BoardMemberRole.Author) {
      return true;
    }

    const requiredWriteRole = requiredRole === BoardMemberRole.Admin;

    if (
      requiredWriteRole &&
      userBoardMembership.role !== BoardMemberRole.Admin
    ) {
      throw new GraphQLError(
        `You do not have permission to modify this board`,
        {
          extensions: {
            code: GraphqlErrorCode.BoardWriteDenied,
          },
        },
      );
    }

    return true;
  }
}
