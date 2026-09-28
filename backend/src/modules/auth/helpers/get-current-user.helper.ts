import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { IGraphQLContext } from '@/common/interfaces/context.interface';

export const getCurrentUser = (context: ExecutionContext): unknown => {
  const ctx = GqlExecutionContext.create(context);

  return ctx.getContext<IGraphQLContext>().req.user;
};
