import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginationArgs {
  @Field(() => Int, { nullable: true })
  first?: number;

  @Field(() => String, { nullable: true })
  after?: string;
}
