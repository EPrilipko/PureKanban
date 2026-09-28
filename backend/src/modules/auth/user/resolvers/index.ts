import { UserResolver } from './user.resolver';
import { CardUsersResolver } from './card.users.resolver';
import { CardCommentsUsersResolver } from './card-comment.users.resolver';

export const UserResolvers = [
  UserResolver,
  CardUsersResolver,
  CardCommentsUsersResolver,
];
