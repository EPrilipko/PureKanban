import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { IGraphQLContext } from '@/common/interfaces/context.interface';

@Injectable()
export class GqlJWTRefreshGuard extends AuthGuard('jwt-refresh') {
  public getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext<IGraphQLContext>().req;
  }
}
