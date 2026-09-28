import { InputType, Field } from '@nestjs/graphql';
import { GraphQLEmailAddress } from 'graphql-scalars';

@InputType()
export class CreateUserInput {
  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field(() => GraphQLEmailAddress)
  email!: string;

  @Field()
  password!: string;
}
