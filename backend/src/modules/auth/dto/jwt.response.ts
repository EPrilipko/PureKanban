import { ObjectType, Field } from '@nestjs/graphql';
import { GraphQLJWT } from 'graphql-scalars';

@ObjectType()
export class JWTResponse {
  @Field(() => GraphQLJWT)
  accessToken!: string;
}
