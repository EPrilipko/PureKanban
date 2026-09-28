import { Query, Resolver, Args, Int } from '@nestjs/graphql';

import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

@Resolver(() => User)
export class UserResolver {
  public constructor(private readonly userService: UserService) {}

  @Query(() => User)
  public async userById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<User | null> {
    return this.userService.getById(id);
  }

  @Query(() => [User])
  public async users(): Promise<User[]> {
    return this.userService.getAll();
  }
}
