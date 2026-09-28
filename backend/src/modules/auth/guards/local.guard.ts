import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { IGraphQLContext } from '@/common/interfaces/context.interface';

import { LoginInput } from '../dto/login.input';

@Injectable()
export class GqlLocalAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext<IGraphQLContext>().req;

    const args = ctx.getArgs<{ input: LoginInput }>();
    req.body = {
      email: args.input.email,
      password: args.input.password,
    };

    return req;
  }
}
