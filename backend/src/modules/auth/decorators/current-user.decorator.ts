import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { getCurrentUser } from '../helpers/get-current-user.helper';

export const CurrentUser = createParamDecorator(
  <T>(data: unknown, context: ExecutionContext): T =>
    getCurrentUser(context) as T,
);
