import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageInfo {
  @Field(() => Boolean)
  hasNextPage!: boolean;

  @Field(() => Boolean)
  hasPreviousPage!: boolean;

  @Field(() => String, { nullable: true })
  startCursor!: string | null;

  @Field(() => String, { nullable: true })
  endCursor!: string | null;
}

export function CursorPaginated<T>(classRef: Type<T>) {
  @ObjectType(`${classRef.name}Edge`, { isAbstract: true })
  abstract class EdgeType {
    @Field()
    cursor!: string;

    @Field(() => classRef)
    node!: T;
  }

  @ObjectType(`${classRef.name}Connection`, { isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [EdgeType])
    edges!: EdgeType[];

    @Field(() => PageInfo)
    pageInfo!: PageInfo;
  }

  return PaginatedType;
}
