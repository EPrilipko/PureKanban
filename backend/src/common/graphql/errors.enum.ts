import { registerEnumType } from '@nestjs/graphql';

export enum GraphqlErrorCode {
  BadRequest = 'BadRequest',
  BoardReadDenied = 'BoardReadDenied',
  BoardWriteDenied = 'BoardWriteDenied',
}

registerEnumType(GraphqlErrorCode, { name: 'GraphqlErrorCode' });
