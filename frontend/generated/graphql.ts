/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  /** A field whose value conforms to the standard internet email address format as specified in HTML Spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address. */
  EmailAddress: { input: any; output: any; }
  /** A field whose value is a hex color code: https://en.wikipedia.org/wiki/Web_colors. */
  HexColorCode: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: { input: any; output: any; }
};

export type Board = {
  __typename?: 'Board';
  boardMembers: Array<BoardMember>;
  cards: Array<Card>;
  color: Scalars['HexColorCode']['output'];
  columns: Array<Column>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  tags: Array<Tag>;
  updatedAt: Scalars['DateTime']['output'];
};

export type BoardMember = {
  __typename?: 'BoardMember';
  board: Board;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  role: BoardMemberRole;
  user: User;
};

export enum BoardMemberRole {
  Admin = 'Admin',
  Author = 'Author',
  User = 'User'
}

export type Card = {
  __typename?: 'Card';
  assignees: Array<User>;
  board: Board;
  column: Column;
  comments: CardCommentPaginated;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  history: CardHistoryPaginated;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  owner?: Maybe<User>;
  rank: Scalars['String']['output'];
  tags: Array<Tag>;
  updatedAt: Scalars['DateTime']['output'];
};


export type CardCommentsArgs = {
  input: PaginationArgs;
};


export type CardHistoryArgs = {
  input: PaginationArgs;
};

export type CardAssigneesAddedNotification = Notification & {
  __typename?: 'CardAssigneesAddedNotification';
  actor: User;
  board: Board;
  card: Card;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isRead: Scalars['Boolean']['output'];
  recipient: User;
  type: NotificationType;
};

export type CardAssigneesRemovedNotification = Notification & {
  __typename?: 'CardAssigneesRemovedNotification';
  actor: User;
  board: Board;
  card: Card;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isRead: Scalars['Boolean']['output'];
  recipient: User;
  type: NotificationType;
};

export type CardAssigneesUpdatedPayload = {
  __typename?: 'CardAssigneesUpdatedPayload';
  action: CardHistoryAction;
  afterAssignees: Array<User>;
  beforeAssignees: Array<User>;
};

export type CardByIdInput = {
  boardId: Scalars['ID']['input'];
  cardId: Scalars['ID']['input'];
};

export type CardComment = {
  __typename?: 'CardComment';
  card: Card;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type CardCommentAddedPayload = {
  __typename?: 'CardCommentAddedPayload';
  action: CardHistoryAction;
  comment: CardComment;
};

export type CardCommentEdge = {
  __typename?: 'CardCommentEdge';
  cursor: Scalars['String']['output'];
  node: CardComment;
};

export type CardCommentPaginated = {
  __typename?: 'CardCommentPaginated';
  edges: Array<CardCommentEdge>;
  pageInfo: PageInfo;
};

export type CardCommentSubscriptionInput = {
  boardId: Scalars['ID']['input'];
  cardId: Scalars['String']['input'];
};

export type CardCreatedPayload = {
  __typename?: 'CardCreatedPayload';
  action: CardHistoryAction;
};

export type CardHistory = {
  __typename?: 'CardHistory';
  author: User;
  card: Card;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  payload: Scalars['JSON']['output'];
};

/** Type of recorded action */
export enum CardHistoryAction {
  AssigneesUpdated = 'AssigneesUpdated',
  CommentAdded = 'CommentAdded',
  Created = 'Created',
  OwnerUpdated = 'OwnerUpdated',
  Updated = 'Updated'
}

export type CardHistoryEdge = {
  __typename?: 'CardHistoryEdge';
  cursor: Scalars['String']['output'];
  node: CardHistory;
};

export type CardHistoryPaginated = {
  __typename?: 'CardHistoryPaginated';
  edges: Array<CardHistoryEdge>;
  pageInfo: PageInfo;
};

export type CardHistorySubscriptionInput = {
  boardId: Scalars['ID']['input'];
  cardId: Scalars['String']['input'];
};

export type CardOwnerAddedNotification = Notification & {
  __typename?: 'CardOwnerAddedNotification';
  actor: User;
  board: Board;
  card: Card;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isRead: Scalars['Boolean']['output'];
  recipient: User;
  type: NotificationType;
};

export type CardOwnerRemovedNotification = Notification & {
  __typename?: 'CardOwnerRemovedNotification';
  actor: User;
  board: Board;
  card: Card;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isRead: Scalars['Boolean']['output'];
  recipient: User;
  type: NotificationType;
};

export type CardOwnerUpdatedPayload = {
  __typename?: 'CardOwnerUpdatedPayload';
  action: CardHistoryAction;
  afterOwner?: Maybe<User>;
  beforeOwner?: Maybe<User>;
};

export type CardSubscriptionInput = {
  boardId: Scalars['ID']['input'];
};

export type CardUpdatedPayload = {
  __typename?: 'CardUpdatedPayload';
  action: CardHistoryAction;
  afterCard: PartialCard;
  beforeCard: PartialCard;
};

export type Column = {
  __typename?: 'Column';
  board: Board;
  cards: Array<Card>;
  color: Scalars['HexColorCode']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  maxCardsCount?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  rank: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ColumnSubscriptionInput = {
  boardId: Scalars['ID']['input'];
};

export type CountNotificationsInput = {
  boardId: Scalars['ID']['input'];
};

export type CreateBoardInput = {
  color: Scalars['HexColorCode']['input'];
  name: Scalars['String']['input'];
};

export type CreateBoardMemberInput = {
  boardId: Scalars['ID']['input'];
  role: BoardMemberRole;
  userId: Scalars['Int']['input'];
};

export type CreateCardCommentInput = {
  boardId: Scalars['ID']['input'];
  cardId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};

export type CreateCardInput = {
  boardId: Scalars['ID']['input'];
  columnId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateColumnInput = {
  boardId: Scalars['ID']['input'];
  color: Scalars['HexColorCode']['input'];
  maxCardsCount?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
};

export type CreateTagInput = {
  boardId: Scalars['ID']['input'];
  color: Scalars['HexColorCode']['input'];
  name: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type DeleteBoardMemberInput = {
  boardId: Scalars['ID']['input'];
  userId: Scalars['Int']['input'];
};

export type GetNotificationsInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  boardId: Scalars['ID']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  onlyUnread?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum GraphqlErrorCode {
  BadRequest = 'BadRequest',
  BoardReadDenied = 'BoardReadDenied',
  BoardWriteDenied = 'BoardWriteDenied'
}

export type JwtResponse = {
  __typename?: 'JWTResponse';
  accessToken: Scalars['JWT']['output'];
};

export type LoginInput = {
  deviceId: Scalars['String']['input'];
  email: Scalars['EmailAddress']['input'];
  password: Scalars['String']['input'];
};

export type MoveCardInput = {
  boardId: Scalars['ID']['input'];
  cardId: Scalars['ID']['input'];
  columnId?: InputMaybe<Scalars['ID']['input']>;
  nextCardId?: InputMaybe<Scalars['ID']['input']>;
  prevCardId?: InputMaybe<Scalars['ID']['input']>;
};

export type MoveCardResponse = {
  __typename?: 'MoveCardResponse';
  boardId: Scalars['String']['output'];
  card: Card;
  sourceColumn: Column;
  targetColumn: Column;
};

export type MoveColumnInput = {
  boardId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
  nextColumnId?: InputMaybe<Scalars['ID']['input']>;
  prevColumnId?: InputMaybe<Scalars['ID']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  clearSessions: Scalars['Boolean']['output'];
  createBoard: Board;
  createBoardMember: BoardMember;
  createCard: Card;
  createCardComment: CardComment;
  createColumn: Column;
  createTag: Tag;
  createUser: User;
  deleteBoard: Board;
  deleteBoardMember: BoardMember;
  deleteCardComment: CardComment;
  deleteColumn: Column;
  deleteTag: Tag;
  login: JwtResponse;
  logout: Scalars['Boolean']['output'];
  moveCard: MoveCardResponse;
  moveColumn: Column;
  readNotification: Notification;
  refresh: JwtResponse;
  updateBoard: Board;
  updateBoardMember: BoardMember;
  updateCard: Card;
  updateCardAssignees: Card;
  updateCardComment: CardComment;
  updateCardOwner: Card;
  updateColumn: Column;
  updateTag: Tag;
};


export type MutationCreateBoardArgs = {
  input: CreateBoardInput;
};


export type MutationCreateBoardMemberArgs = {
  input: CreateBoardMemberInput;
};


export type MutationCreateCardArgs = {
  input: CreateCardInput;
};


export type MutationCreateCardCommentArgs = {
  input: CreateCardCommentInput;
};


export type MutationCreateColumnArgs = {
  input: CreateColumnInput;
};


export type MutationCreateTagArgs = {
  input: CreateTagInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteBoardArgs = {
  boardId: Scalars['ID']['input'];
};


export type MutationDeleteBoardMemberArgs = {
  input: DeleteBoardMemberInput;
};


export type MutationDeleteCardCommentArgs = {
  boardId: Scalars['ID']['input'];
  commentId: Scalars['ID']['input'];
};


export type MutationDeleteColumnArgs = {
  boardId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};


export type MutationDeleteTagArgs = {
  boardId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationMoveCardArgs = {
  input: MoveCardInput;
};


export type MutationMoveColumnArgs = {
  input: MoveColumnInput;
};


export type MutationReadNotificationArgs = {
  boardId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};


export type MutationUpdateBoardArgs = {
  input: UpdateBoardInput;
};


export type MutationUpdateBoardMemberArgs = {
  input: UpdateBoardMemberInput;
};


export type MutationUpdateCardArgs = {
  input: UpdateCardInput;
};


export type MutationUpdateCardAssigneesArgs = {
  input: UpdateCardAssigneesInput;
};


export type MutationUpdateCardCommentArgs = {
  input: UpdateCardCommentInput;
};


export type MutationUpdateCardOwnerArgs = {
  input: UpdateCardOwnerInput;
};


export type MutationUpdateColumnArgs = {
  input: UpdateColumnInput;
};


export type MutationUpdateTagArgs = {
  input: UpdateTagInput;
};

export type Notification = {
  actor: User;
  board: Board;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isRead: Scalars['Boolean']['output'];
  recipient: User;
  type: NotificationType;
};

export type NotificationEdge = {
  __typename?: 'NotificationEdge';
  cursor: Scalars['String']['output'];
  node: Notification;
};

export type NotificationPaginated = {
  __typename?: 'NotificationPaginated';
  edges: Array<NotificationEdge>;
  pageInfo: PageInfo;
};

export type NotificationSubscriptionInput = {
  boardId: Scalars['ID']['input'];
  onlyUnread?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum NotificationType {
  CardAssigneesAdded = 'CardAssigneesAdded',
  CardAssigneesRemoved = 'CardAssigneesRemoved',
  CardOwnerAdded = 'CardOwnerAdded',
  CardOwnerRemoved = 'CardOwnerRemoved'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PaginationArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type PartialCard = {
  __typename?: 'PartialCard';
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Tag>>;
};

export type Query = {
  __typename?: 'Query';
  allSessions: Array<UserSession>;
  board: Board;
  boards: Array<Board>;
  cardById: Card;
  cardsByBoard: Array<Card>;
  column: Column;
  countUnreadNotifications: Scalars['Int']['output'];
  notifications: NotificationPaginated;
  searchCards: Array<Card>;
  tagById: Tag;
  tags: Array<Tag>;
  userById: User;
  users: Array<User>;
  whoAmI: User;
};


export type QueryBoardArgs = {
  boardId: Scalars['ID']['input'];
};


export type QueryCardByIdArgs = {
  input: CardByIdInput;
};


export type QueryCardsByBoardArgs = {
  boardId: Scalars['ID']['input'];
};


export type QueryColumnArgs = {
  boardId: Scalars['ID']['input'];
  columnId: Scalars['ID']['input'];
};


export type QueryCountUnreadNotificationsArgs = {
  input: CountNotificationsInput;
};


export type QueryNotificationsArgs = {
  input: GetNotificationsInput;
};


export type QuerySearchCardsArgs = {
  input: SearchCardsInput;
};


export type QueryTagByIdArgs = {
  boardId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};


export type QueryTagsArgs = {
  boardId: Scalars['ID']['input'];
};


export type QueryUserByIdArgs = {
  id: Scalars['Int']['input'];
};

export type SearchCardsInput = {
  boardId: Scalars['ID']['input'];
  query: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  boardCreated: Board;
  boardDeleted: Board;
  boardMemberCreated: BoardMember;
  boardMemberDeleted: BoardMember;
  boardMemberUpdated: BoardMember;
  boardUpdated: Board;
  cardCreated: Card;
  cardMoved: MoveCardResponse;
  cardUpdated: Card;
  columnCreated: Column;
  columnDeleted: Column;
  columnUpdated: Column;
  commentCreated: CardComment;
  commentDeleted: CardComment;
  commentUpdated: CardComment;
  historyCreated: CardHistory;
  notificationCreated: Notification;
  notificationUnreadCountUpdated: Scalars['Float']['output'];
  notificationUpdated: Notification;
  tagCreated: Tag;
  tagDeleted: Tag;
  tagUpdated: Tag;
};


export type SubscriptionCardCreatedArgs = {
  input: CardSubscriptionInput;
};


export type SubscriptionCardMovedArgs = {
  input: CardSubscriptionInput;
};


export type SubscriptionCardUpdatedArgs = {
  input: CardSubscriptionInput;
};


export type SubscriptionColumnCreatedArgs = {
  input: ColumnSubscriptionInput;
};


export type SubscriptionColumnDeletedArgs = {
  input: ColumnSubscriptionInput;
};


export type SubscriptionColumnUpdatedArgs = {
  input: ColumnSubscriptionInput;
};


export type SubscriptionCommentCreatedArgs = {
  input: CardCommentSubscriptionInput;
};


export type SubscriptionCommentDeletedArgs = {
  input: CardCommentSubscriptionInput;
};


export type SubscriptionCommentUpdatedArgs = {
  input: CardCommentSubscriptionInput;
};


export type SubscriptionHistoryCreatedArgs = {
  input: CardHistorySubscriptionInput;
};


export type SubscriptionNotificationCreatedArgs = {
  input: NotificationSubscriptionInput;
};


export type SubscriptionNotificationUnreadCountUpdatedArgs = {
  input: UnreadNotificationsCountUpdatedInput;
};


export type SubscriptionNotificationUpdatedArgs = {
  input: NotificationSubscriptionInput;
};


export type SubscriptionTagCreatedArgs = {
  input: TagSubscriptionInput;
};


export type SubscriptionTagDeletedArgs = {
  input: TagSubscriptionInput;
};


export type SubscriptionTagUpdatedArgs = {
  input: TagSubscriptionInput;
};

export type Tag = {
  __typename?: 'Tag';
  board: Board;
  cards: Array<Card>;
  color: Scalars['HexColorCode']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TagSubscriptionInput = {
  boardId: Scalars['ID']['input'];
};

export type UnreadNotificationsCountUpdatedInput = {
  boardId: Scalars['ID']['input'];
};

export type UpdateBoardInput = {
  boardId: Scalars['ID']['input'];
  color?: InputMaybe<Scalars['HexColorCode']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBoardMemberInput = {
  boardId: Scalars['ID']['input'];
  role: BoardMemberRole;
  userId: Scalars['Int']['input'];
};

export type UpdateCardAssigneesInput = {
  assigneeIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  boardId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};

export type UpdateCardCommentInput = {
  boardId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};

export type UpdateCardInput = {
  boardId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  tagIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateCardOwnerInput = {
  boardId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
  ownerId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateColumnInput = {
  boardId: Scalars['ID']['input'];
  color?: InputMaybe<Scalars['HexColorCode']['input']>;
  id: Scalars['ID']['input'];
  maxCardsCount?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTagInput = {
  boardId: Scalars['ID']['input'];
  color?: InputMaybe<Scalars['HexColorCode']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  boardMemberships: Array<BoardMember>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['EmailAddress']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  passwordHash: Scalars['String']['output'];
  sessions: Array<UserSession>;
};

export type UserSession = {
  __typename?: 'UserSession';
  deviceId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  refreshTokenHash: Scalars['String']['output'];
  user: User;
};

export type BoardMemberIdFragment = { __typename?: 'BoardMember', id: string };

export type BoardMemberShortFragment = { __typename?: 'BoardMember', id: string, role: BoardMemberRole, user: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } };

export type BoardMemberFullFragment = { __typename?: 'BoardMember', id: string, role: BoardMemberRole, board: { __typename?: 'Board', id: string, name: string, color: any, boardMembers: Array<{ __typename?: 'BoardMember', id: string, role: BoardMemberRole, user: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }> }, user: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } };

export type CreateBoardMemberMutationVariables = Exact<{
  input: CreateBoardMemberInput;
}>;


export type CreateBoardMemberMutation = { __typename?: 'Mutation', createBoardMember: { __typename?: 'BoardMember', board: { __typename?: 'Board', id: string, boardMembers: Array<{ __typename?: 'BoardMember', role: BoardMemberRole, user: { __typename?: 'User', id: number } }> } } };

export type UpdateBoardMemberMutationVariables = Exact<{
  input: UpdateBoardMemberInput;
}>;


export type UpdateBoardMemberMutation = { __typename?: 'Mutation', updateBoardMember: { __typename?: 'BoardMember', board: { __typename?: 'Board', id: string, boardMembers: Array<{ __typename?: 'BoardMember', role: BoardMemberRole, user: { __typename?: 'User', id: number } }> } } };

export type DeleteBoardMemberMutationVariables = Exact<{
  input: DeleteBoardMemberInput;
}>;


export type DeleteBoardMemberMutation = { __typename?: 'Mutation', deleteBoardMember: { __typename?: 'BoardMember', id: string } };

export type BoardMemberCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type BoardMemberCreatedSubscription = { __typename?: 'Subscription', boardMemberCreated: { __typename?: 'BoardMember', id: string, role: BoardMemberRole, board: { __typename?: 'Board', id: string, name: string, color: any, boardMembers: Array<{ __typename?: 'BoardMember', id: string, role: BoardMemberRole, user: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }> }, user: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } } };

export type BoardMemberUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type BoardMemberUpdatedSubscription = { __typename?: 'Subscription', boardMemberUpdated: { __typename?: 'BoardMember', id: string, role: BoardMemberRole, board: { __typename?: 'Board', id: string, name: string, color: any, boardMembers: Array<{ __typename?: 'BoardMember', id: string, role: BoardMemberRole, user: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }> }, user: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } } };

export type BoardMemberDeletedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type BoardMemberDeletedSubscription = { __typename?: 'Subscription', boardMemberDeleted: { __typename?: 'BoardMember', id: string, role: BoardMemberRole, board: { __typename?: 'Board', id: string, name: string, color: any, boardMembers: Array<{ __typename?: 'BoardMember', id: string, role: BoardMemberRole, user: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }> }, user: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } } };

export type BoardIdFragment = { __typename?: 'Board', id: string };

export type BoardRenderFragment = { __typename?: 'Board', id: string, name: string, color: any };

export type BoardMembersFragment = { __typename?: 'Board', id: string, boardMembers: Array<{ __typename?: 'BoardMember', id: string, role: BoardMemberRole, user: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }> };

export type CreateBoardMutationVariables = Exact<{
  input: CreateBoardInput;
}>;


export type CreateBoardMutation = { __typename?: 'Mutation', createBoard: { __typename?: 'Board', id: string, name: string, color: any } };

export type UpdateBoardMutationVariables = Exact<{
  input: UpdateBoardInput;
}>;


export type UpdateBoardMutation = { __typename?: 'Mutation', updateBoard: { __typename?: 'Board', id: string, name: string, color: any } };

export type DeleteBoardMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
}>;


export type DeleteBoardMutation = { __typename?: 'Mutation', deleteBoard: { __typename?: 'Board', id: string } };

export type BoardCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type BoardCreatedSubscription = { __typename?: 'Subscription', boardCreated: { __typename?: 'Board', id: string, name: string, color: any, boardMembers: Array<{ __typename?: 'BoardMember', id: string, role: BoardMemberRole, user: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }> } };

export type BoardUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type BoardUpdatedSubscription = { __typename?: 'Subscription', boardUpdated: { __typename?: 'Board', id: string, name: string, color: any, boardMembers: Array<{ __typename?: 'BoardMember', id: string, role: BoardMemberRole, user: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }> } };

export type BoardDeletedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type BoardDeletedSubscription = { __typename?: 'Subscription', boardDeleted: { __typename?: 'Board', id: string, name: string, color: any, boardMembers: Array<{ __typename?: 'BoardMember', id: string, role: BoardMemberRole, user: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }> } };

export type CardCommentIdFragment = { __typename?: 'CardComment', id: string };

export type CardCommentRenderFragment = { __typename?: 'CardComment', id: string, text: string, createdAt: any, user: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } };

export type CardCommentPaginatedRenderFragment = { __typename?: 'CardCommentPaginated', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'CardCommentEdge', cursor: string, node: { __typename?: 'CardComment', id: string, text: string, createdAt: any, user: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } } }> };

export type CreateCardCommentMutationVariables = Exact<{
  input: CreateCardCommentInput;
}>;


export type CreateCardCommentMutation = { __typename?: 'Mutation', createCardComment: { __typename?: 'CardComment', id: string, text: string, createdAt: any, user: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } } };

export type UpdateCardCommentMutationVariables = Exact<{
  input: UpdateCardCommentInput;
}>;


export type UpdateCardCommentMutation = { __typename?: 'Mutation', updateCardComment: { __typename?: 'CardComment', id: string, text: string, createdAt: any, user: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } } };

export type DeleteCardCommentMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  commentId: Scalars['ID']['input'];
}>;


export type DeleteCardCommentMutation = { __typename?: 'Mutation', deleteCardComment: { __typename?: 'CardComment', id: string } };

export type CardCommentCreatedSubscriptionVariables = Exact<{
  input: CardCommentSubscriptionInput;
}>;


export type CardCommentCreatedSubscription = { __typename?: 'Subscription', commentCreated: { __typename?: 'CardComment', id: string, text: string, createdAt: any, card: { __typename?: 'Card', id: string }, user: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } } };

export type CardCommentUpdatedSubscriptionVariables = Exact<{
  input: CardCommentSubscriptionInput;
}>;


export type CardCommentUpdatedSubscription = { __typename?: 'Subscription', commentUpdated: { __typename?: 'CardComment', id: string, text: string, createdAt: any, user: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } } };

export type CardCommentDeletedSubscriptionVariables = Exact<{
  input: CardCommentSubscriptionInput;
}>;


export type CardCommentDeletedSubscription = { __typename?: 'Subscription', commentDeleted: { __typename?: 'CardComment', id: string } };

export type PartialCardRenderFragment = { __typename?: 'PartialCard', name?: string | null, description?: string | null, tags?: Array<{ __typename?: 'Tag', id: string, name: string, color: any }> | null };

export type CardHistoryIdFragment = { __typename?: 'CardHistory', id: string };

export type CardHistoryRenderFragment = { __typename?: 'CardHistory', id: string, createdAt: any, payload: any, author: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } };

export type CardHistoryPaginatedRenderFragment = { __typename?: 'CardHistoryPaginated', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'CardHistoryEdge', cursor: string, node: { __typename?: 'CardHistory', id: string, createdAt: any, payload: any, author: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } } }> };

export type CardHistoryCreatedSubscriptionVariables = Exact<{
  input: CardHistorySubscriptionInput;
}>;


export type CardHistoryCreatedSubscription = { __typename?: 'Subscription', historyCreated: { __typename?: 'CardHistory', id: string, createdAt: any, payload: any, card: { __typename?: 'Card', id: string }, author: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } } };

export type CardIdFragment = { __typename?: 'Card', id: string };

export type CardSortFragment = { __typename?: 'Card', id: string, rank: string };

export type CardNameFragment = { __typename?: 'Card', id: string, name: string };

export type CardRenderFragment = { __typename?: 'Card', id: string, name: string, description: string };

export type CreateCardMutationVariables = Exact<{
  input: CreateCardInput;
}>;


export type CreateCardMutation = { __typename?: 'Mutation', createCard: { __typename?: 'Card', id: string, name: string, description: string, rank: string, column: { __typename?: 'Column', id: string } } };

export type UpdateCardMutationVariables = Exact<{
  input: UpdateCardInput;
}>;


export type UpdateCardMutation = { __typename?: 'Mutation', updateCard: { __typename?: 'Card', id: string, name: string, description: string, rank: string, column: { __typename?: 'Column', id: string } } };

export type MoveCardMutationVariables = Exact<{
  input: MoveCardInput;
}>;


export type MoveCardMutation = { __typename?: 'Mutation', moveCard: { __typename?: 'MoveCardResponse', card: { __typename?: 'Card', id: string, name: string, description: string, rank: string, column: { __typename?: 'Column', id: string } }, sourceColumn: { __typename?: 'Column', id: string, cards: Array<{ __typename?: 'Card', id: string }> }, targetColumn: { __typename?: 'Column', id: string, cards: Array<{ __typename?: 'Card', id: string }> } } };

export type AttachTagMutationVariables = Exact<{
  input: UpdateCardInput;
}>;


export type AttachTagMutation = { __typename?: 'Mutation', updateCard: { __typename?: 'Card', id: string, tags: Array<{ __typename?: 'Tag', id: string, name: string, color: any }> } };

export type UpdateCardOwnerMutationVariables = Exact<{
  input: UpdateCardOwnerInput;
}>;


export type UpdateCardOwnerMutation = { __typename?: 'Mutation', updateCardOwner: { __typename?: 'Card', id: string, owner?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } | null } };

export type UpdateCardAssigneesMutationVariables = Exact<{
  input: UpdateCardAssigneesInput;
}>;


export type UpdateCardAssigneesMutation = { __typename?: 'Mutation', updateCardAssignees: { __typename?: 'Card', id: string, assignees: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: any }> } };

export type CardCreatedSubscriptionVariables = Exact<{
  input: CardSubscriptionInput;
}>;


export type CardCreatedSubscription = { __typename?: 'Subscription', cardCreated: { __typename?: 'Card', id: string, name: string, description: string, rank: string, column: { __typename?: 'Column', id: string } } };

export type CardUpdatedSubscriptionVariables = Exact<{
  input: CardSubscriptionInput;
}>;


export type CardUpdatedSubscription = { __typename?: 'Subscription', cardUpdated: { __typename?: 'Card', id: string, name: string, description: string, rank: string, column: { __typename?: 'Column', id: string }, owner?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } | null, assignees: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: any }>, tags: Array<{ __typename?: 'Tag', id: string }>, board: { __typename?: 'Board', id: string, tags: Array<{ __typename?: 'Tag', id: string, name: string, color: any }> } } };

export type CardMovedSubscriptionVariables = Exact<{
  input: CardSubscriptionInput;
}>;


export type CardMovedSubscription = { __typename?: 'Subscription', cardMoved: { __typename?: 'MoveCardResponse', card: { __typename?: 'Card', id: string, name: string, description: string, rank: string, column: { __typename?: 'Column', id: string } }, sourceColumn: { __typename?: 'Column', id: string }, targetColumn: { __typename?: 'Column', id: string } } };

export type ColumnIdFragment = { __typename?: 'Column', id: string };

export type ColumnSortFragment = { __typename?: 'Column', id: string, rank: string };

export type ColumnRenderFragment = { __typename?: 'Column', id: string, name: string, color: any, maxCardsCount?: number | null };

export type CreateColumnMutationVariables = Exact<{
  input: CreateColumnInput;
}>;


export type CreateColumnMutation = { __typename?: 'Mutation', createColumn: { __typename?: 'Column', id: string, name: string, color: any, maxCardsCount?: number | null, rank: string, board: { __typename?: 'Board', id: string, columns: Array<{ __typename?: 'Column', id: string }> } } };

export type UpdateColumnMutationVariables = Exact<{
  input: UpdateColumnInput;
}>;


export type UpdateColumnMutation = { __typename?: 'Mutation', updateColumn: { __typename?: 'Column', id: string, name: string, color: any, maxCardsCount?: number | null } };

export type MoveColumnMutationVariables = Exact<{
  input: MoveColumnInput;
}>;


export type MoveColumnMutation = { __typename?: 'Mutation', moveColumn: { __typename?: 'Column', id: string, name: string, color: any, maxCardsCount?: number | null, rank: string } };

export type DeleteColumnMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
}>;


export type DeleteColumnMutation = { __typename?: 'Mutation', deleteColumn: { __typename?: 'Column', id: string } };

export type ColumnCreatedSubscriptionVariables = Exact<{
  input: ColumnSubscriptionInput;
}>;


export type ColumnCreatedSubscription = { __typename?: 'Subscription', columnCreated: { __typename?: 'Column', id: string, name: string, color: any, maxCardsCount?: number | null, rank: string, cards: Array<{ __typename?: 'Card', id: string, name: string, description: string, rank: string, column: { __typename?: 'Column', id: string } }> } };

export type ColumnUpdatedSubscriptionVariables = Exact<{
  input: ColumnSubscriptionInput;
}>;


export type ColumnUpdatedSubscription = { __typename?: 'Subscription', columnUpdated: { __typename?: 'Column', id: string, name: string, color: any, maxCardsCount?: number | null, rank: string, cards: Array<{ __typename?: 'Card', id: string, name: string, description: string, rank: string, column: { __typename?: 'Column', id: string } }> } };

export type ColumnDeletedSubscriptionVariables = Exact<{
  input: ColumnSubscriptionInput;
}>;


export type ColumnDeletedSubscription = { __typename?: 'Subscription', columnDeleted: { __typename?: 'Column', id: string, name: string, color: any, maxCardsCount?: number | null, rank: string, cards: Array<{ __typename?: 'Card', id: string, name: string, description: string, rank: string, column: { __typename?: 'Column', id: string } }> } };

type NotificationRender_CardAssigneesAddedNotification_Fragment = { __typename?: 'CardAssigneesAddedNotification', id: string, type: NotificationType, createdAt: any, isRead: boolean, card: { __typename?: 'Card', id: string, name: string }, actor: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } };

type NotificationRender_CardAssigneesRemovedNotification_Fragment = { __typename?: 'CardAssigneesRemovedNotification', id: string, type: NotificationType, createdAt: any, isRead: boolean, card: { __typename?: 'Card', id: string, name: string }, actor: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } };

type NotificationRender_CardOwnerAddedNotification_Fragment = { __typename?: 'CardOwnerAddedNotification', id: string, type: NotificationType, createdAt: any, isRead: boolean, card: { __typename?: 'Card', id: string, name: string }, actor: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } };

type NotificationRender_CardOwnerRemovedNotification_Fragment = { __typename?: 'CardOwnerRemovedNotification', id: string, type: NotificationType, createdAt: any, isRead: boolean, card: { __typename?: 'Card', id: string, name: string }, actor: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } };

export type NotificationRenderFragment =
  | NotificationRender_CardAssigneesAddedNotification_Fragment
  | NotificationRender_CardAssigneesRemovedNotification_Fragment
  | NotificationRender_CardOwnerAddedNotification_Fragment
  | NotificationRender_CardOwnerRemovedNotification_Fragment
;

export type NotificationPaginatedRenderFragment = { __typename?: 'NotificationPaginated', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'NotificationEdge', cursor: string, node:
      | { __typename?: 'CardAssigneesAddedNotification', id: string, type: NotificationType, createdAt: any, isRead: boolean, card: { __typename?: 'Card', id: string, name: string }, actor: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }
      | { __typename?: 'CardAssigneesRemovedNotification', id: string, type: NotificationType, createdAt: any, isRead: boolean, card: { __typename?: 'Card', id: string, name: string }, actor: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }
      | { __typename?: 'CardOwnerAddedNotification', id: string, type: NotificationType, createdAt: any, isRead: boolean, card: { __typename?: 'Card', id: string, name: string }, actor: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }
      | { __typename?: 'CardOwnerRemovedNotification', id: string, type: NotificationType, createdAt: any, isRead: boolean, card: { __typename?: 'Card', id: string, name: string }, actor: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }
     }> };

export type ReadNotificationMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
}>;


export type ReadNotificationMutation = { __typename?: 'Mutation', readNotification:
    | { __typename?: 'CardAssigneesAddedNotification', id: string, type: NotificationType, createdAt: any, isRead: boolean, card: { __typename?: 'Card', id: string, name: string }, actor: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }
    | { __typename?: 'CardAssigneesRemovedNotification', id: string, type: NotificationType, createdAt: any, isRead: boolean, card: { __typename?: 'Card', id: string, name: string }, actor: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }
    | { __typename?: 'CardOwnerAddedNotification', id: string, type: NotificationType, createdAt: any, isRead: boolean, card: { __typename?: 'Card', id: string, name: string }, actor: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }
    | { __typename?: 'CardOwnerRemovedNotification', id: string, type: NotificationType, createdAt: any, isRead: boolean, card: { __typename?: 'Card', id: string, name: string }, actor: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }
   };

export type NotificationCreatedSubscriptionVariables = Exact<{
  input: NotificationSubscriptionInput;
}>;


export type NotificationCreatedSubscription = { __typename?: 'Subscription', notificationCreated:
    | { __typename?: 'CardAssigneesAddedNotification', id: string, type: NotificationType, createdAt: any, isRead: boolean, card: { __typename?: 'Card', id: string, name: string }, actor: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }
    | { __typename?: 'CardAssigneesRemovedNotification', id: string, type: NotificationType, createdAt: any, isRead: boolean, card: { __typename?: 'Card', id: string, name: string }, actor: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }
    | { __typename?: 'CardOwnerAddedNotification', id: string, type: NotificationType, createdAt: any, isRead: boolean, card: { __typename?: 'Card', id: string, name: string }, actor: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }
    | { __typename?: 'CardOwnerRemovedNotification', id: string, type: NotificationType, createdAt: any, isRead: boolean, card: { __typename?: 'Card', id: string, name: string }, actor: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }
   };

export type NotificationUpdatedSubscriptionVariables = Exact<{
  input: NotificationSubscriptionInput;
}>;


export type NotificationUpdatedSubscription = { __typename?: 'Subscription', notificationUpdated:
    | { __typename?: 'CardAssigneesAddedNotification', id: string, type: NotificationType, createdAt: any, isRead: boolean, card: { __typename?: 'Card', id: string, name: string }, actor: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }
    | { __typename?: 'CardAssigneesRemovedNotification', id: string, type: NotificationType, createdAt: any, isRead: boolean, card: { __typename?: 'Card', id: string, name: string }, actor: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }
    | { __typename?: 'CardOwnerAddedNotification', id: string, type: NotificationType, createdAt: any, isRead: boolean, card: { __typename?: 'Card', id: string, name: string }, actor: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }
    | { __typename?: 'CardOwnerRemovedNotification', id: string, type: NotificationType, createdAt: any, isRead: boolean, card: { __typename?: 'Card', id: string, name: string }, actor: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }
   };

export type NotificationUnreadCountUpdatedSubscriptionVariables = Exact<{
  input: UnreadNotificationsCountUpdatedInput;
}>;


export type NotificationUnreadCountUpdatedSubscription = { __typename?: 'Subscription', notificationUnreadCountUpdated: number };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'JWTResponse', accessToken: any } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RefreshMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshMutation = { __typename?: 'Mutation', refresh: { __typename?: 'JWTResponse', accessToken: any } };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } };

export type WhoAmIQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoAmIQuery = { __typename?: 'Query', whoAmI: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any, boardMemberships: Array<{ __typename?: 'BoardMember', id: string, role: BoardMemberRole, board: { __typename?: 'Board', id: string } }> } };

export type TagIdFragment = { __typename?: 'Tag', id: string };

export type TagRenderFragment = { __typename?: 'Tag', id: string, name: string, color: any };

export type CreateTagMutationVariables = Exact<{
  input: CreateTagInput;
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag: { __typename?: 'Tag', id: string, name: string, color: any, cards: Array<{ __typename?: 'Card', id: string }>, board: { __typename?: 'Board', id: string, tags: Array<{ __typename?: 'Tag', id: string, name: string, color: any }> } } };

export type UpdateTagMutationVariables = Exact<{
  input: UpdateTagInput;
}>;


export type UpdateTagMutation = { __typename?: 'Mutation', updateTag: { __typename?: 'Tag', id: string, name: string, color: any } };

export type DeleteTagMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
}>;


export type DeleteTagMutation = { __typename?: 'Mutation', deleteTag: { __typename?: 'Tag', id: string } };

export type TagCreatedSubscriptionVariables = Exact<{
  input: TagSubscriptionInput;
}>;


export type TagCreatedSubscription = { __typename?: 'Subscription', tagCreated: { __typename?: 'Tag', id: string, name: string, color: any, cards: Array<{ __typename?: 'Card', id: string }>, board: { __typename?: 'Board', id: string, tags: Array<{ __typename?: 'Tag', id: string, name: string, color: any }> } } };

export type TagUpdatedSubscriptionVariables = Exact<{
  input: TagSubscriptionInput;
}>;


export type TagUpdatedSubscription = { __typename?: 'Subscription', tagUpdated: { __typename?: 'Tag', id: string, name: string, color: any } };

export type TagDeletedSubscriptionVariables = Exact<{
  input: TagSubscriptionInput;
}>;


export type TagDeletedSubscription = { __typename?: 'Subscription', tagDeleted: { __typename?: 'Tag', id: string } };

export type UserIdFragment = { __typename?: 'User', id: number };

export type UserShortFragment = { __typename?: 'User', id: number, firstName: string, lastName: string, email: any };

export type UsersListQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersListQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: any }> };

export type BoardMembersSelectDataQueryVariables = Exact<{
  boardId: Scalars['ID']['input'];
}>;


export type BoardMembersSelectDataQuery = { __typename?: 'Query', board: { __typename?: 'Board', id: string, name: string, color: any, boardMembers: Array<{ __typename?: 'BoardMember', id: string, role: BoardMemberRole, user: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }> } };

export type GetNotificationsQueryVariables = Exact<{
  input: GetNotificationsInput;
}>;


export type GetNotificationsQuery = { __typename?: 'Query', notifications: { __typename?: 'NotificationPaginated', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'NotificationEdge', cursor: string, node:
        | { __typename?: 'CardAssigneesAddedNotification', id: string, type: NotificationType, createdAt: any, isRead: boolean, card: { __typename?: 'Card', id: string, name: string }, actor: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }
        | { __typename?: 'CardAssigneesRemovedNotification', id: string, type: NotificationType, createdAt: any, isRead: boolean, card: { __typename?: 'Card', id: string, name: string }, actor: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }
        | { __typename?: 'CardOwnerAddedNotification', id: string, type: NotificationType, createdAt: any, isRead: boolean, card: { __typename?: 'Card', id: string, name: string }, actor: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }
        | { __typename?: 'CardOwnerRemovedNotification', id: string, type: NotificationType, createdAt: any, isRead: boolean, card: { __typename?: 'Card', id: string, name: string }, actor: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }
       }> } };

export type CountUnreadNotificationsQueryVariables = Exact<{
  input: CountNotificationsInput;
}>;


export type CountUnreadNotificationsQuery = { __typename?: 'Query', countUnreadNotifications: number };

export type AllBoardsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllBoardsQuery = { __typename?: 'Query', boards: Array<{ __typename?: 'Board', id: string, name: string, color: any }> };

export type SearchCardsQueryVariables = Exact<{
  input: SearchCardsInput;
}>;


export type SearchCardsQuery = { __typename?: 'Query', searchCards: Array<{ __typename?: 'Card', id: string, name: string, description: string }> };

export type BoardsGridDataQueryVariables = Exact<{ [key: string]: never; }>;


export type BoardsGridDataQuery = { __typename?: 'Query', boards: Array<{ __typename?: 'Board', id: string, name: string, color: any, boardMembers: Array<{ __typename?: 'BoardMember', id: string, role: BoardMemberRole, user: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } }> }> };

export type CardCommentsQueryVariables = Exact<{
  input: CardByIdInput;
  pagination: PaginationArgs;
}>;


export type CardCommentsQuery = { __typename?: 'Query', cardById: { __typename?: 'Card', id: string, comments: { __typename?: 'CardCommentPaginated', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'CardCommentEdge', cursor: string, node: { __typename?: 'CardComment', id: string, text: string, createdAt: any, user: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } } }> } } };

export type CardHistoryQueryVariables = Exact<{
  input: CardByIdInput;
  pagination: PaginationArgs;
}>;


export type CardHistoryQuery = { __typename?: 'Query', cardById: { __typename?: 'Card', id: string, history: { __typename?: 'CardHistoryPaginated', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'CardHistoryEdge', cursor: string, node: { __typename?: 'CardHistory', id: string, createdAt: any, payload: any, author: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } } }> } } };

export type GetCardByIdQueryVariables = Exact<{
  input: CardByIdInput;
}>;


export type GetCardByIdQuery = { __typename?: 'Query', cardById: { __typename?: 'Card', id: string, name: string, description: string, owner?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: any } | null, assignees: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: any }>, tags: Array<{ __typename?: 'Tag', id: string }>, board: { __typename?: 'Board', id: string, tags: Array<{ __typename?: 'Tag', id: string, name: string, color: any }> } } };

export type GetBoardDataQueryVariables = Exact<{
  boardId: Scalars['ID']['input'];
}>;


export type GetBoardDataQuery = { __typename?: 'Query', board: { __typename?: 'Board', id: string, name: string, color: any, columns: Array<{ __typename?: 'Column', id: string, name: string, color: any, maxCardsCount?: number | null, rank: string, cards: Array<{ __typename?: 'Card', id: string, name: string, description: string, rank: string, column: { __typename?: 'Column', id: string } }> }> } };

export const BoardMemberIdFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardMemberId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardMember"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<BoardMemberIdFragment, unknown>;
export const BoardRenderFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]} as unknown as DocumentNode<BoardRenderFragment, unknown>;
export const UserShortFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<UserShortFragment, unknown>;
export const BoardMemberShortFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardMemberShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardMember"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<BoardMemberShortFragment, unknown>;
export const BoardMembersFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardMembers"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"boardMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardMemberShort"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardMemberShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardMember"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<BoardMembersFragment, unknown>;
export const BoardMemberFullFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardMemberFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardMember"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"board"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardRender"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardMembers"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardMemberShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardMember"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardMembers"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"boardMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardMemberShort"}}]}}]}}]} as unknown as DocumentNode<BoardMemberFullFragment, unknown>;
export const BoardIdFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<BoardIdFragment, unknown>;
export const CardCommentIdFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardCommentId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardComment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<CardCommentIdFragment, unknown>;
export const CardCommentRenderFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardCommentRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardComment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<CardCommentRenderFragment, unknown>;
export const CardCommentPaginatedRenderFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardCommentPaginatedRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardCommentPaginated"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardCommentRender"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardCommentRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardComment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}}]}}]} as unknown as DocumentNode<CardCommentPaginatedRenderFragment, unknown>;
export const TagRenderFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]} as unknown as DocumentNode<TagRenderFragment, unknown>;
export const PartialCardRenderFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PartialCardRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PartialCard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagRender"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]} as unknown as DocumentNode<PartialCardRenderFragment, unknown>;
export const CardHistoryIdFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardHistoryId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<CardHistoryIdFragment, unknown>;
export const CardHistoryRenderFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardHistoryRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payload"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<CardHistoryRenderFragment, unknown>;
export const CardHistoryPaginatedRenderFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardHistoryPaginatedRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardHistoryPaginated"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardHistoryRender"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardHistoryRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payload"}}]}}]} as unknown as DocumentNode<CardHistoryPaginatedRenderFragment, unknown>;
export const CardIdFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<CardIdFragment, unknown>;
export const CardSortFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardSort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}}]}}]} as unknown as DocumentNode<CardSortFragment, unknown>;
export const CardRenderFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<CardRenderFragment, unknown>;
export const ColumnIdFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColumnId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Column"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<ColumnIdFragment, unknown>;
export const ColumnSortFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColumnSort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Column"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}}]}}]} as unknown as DocumentNode<ColumnSortFragment, unknown>;
export const ColumnRenderFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColumnRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Column"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"maxCardsCount"}}]}}]} as unknown as DocumentNode<ColumnRenderFragment, unknown>;
export const CardNameFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardName"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<CardNameFragment, unknown>;
export const NotificationRenderFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotificationRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Notification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"isRead"}},{"kind":"Field","name":{"kind":"Name","value":"actor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardOwnerAddedNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardName"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardOwnerRemovedNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardName"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardAssigneesAddedNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardName"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardAssigneesRemovedNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardName"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardName"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<NotificationRenderFragment, unknown>;
export const NotificationPaginatedRenderFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotificationPaginatedRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationPaginated"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotificationRender"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardName"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotificationRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Notification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"isRead"}},{"kind":"Field","name":{"kind":"Name","value":"actor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardOwnerAddedNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardName"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardOwnerRemovedNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardName"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardAssigneesAddedNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardName"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardAssigneesRemovedNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardName"}}]}}]}}]}}]} as unknown as DocumentNode<NotificationPaginatedRenderFragment, unknown>;
export const TagIdFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<TagIdFragment, unknown>;
export const UserIdFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<UserIdFragment, unknown>;
export const CreateBoardMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createBoardMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBoardMemberInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBoardMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"board"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardId"}},{"kind":"Field","name":{"kind":"Name","value":"boardMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<CreateBoardMemberMutation, CreateBoardMemberMutationVariables>;
export const UpdateBoardMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateBoardMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBoardMemberInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBoardMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"board"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardId"}},{"kind":"Field","name":{"kind":"Name","value":"boardMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<UpdateBoardMemberMutation, UpdateBoardMemberMutationVariables>;
export const DeleteBoardMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteBoardMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteBoardMemberInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBoardMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardMemberId"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardMemberId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardMember"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<DeleteBoardMemberMutation, DeleteBoardMemberMutationVariables>;
export const BoardMemberCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"boardMemberCreated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boardMemberCreated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardMemberFull"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardMemberShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardMember"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardMembers"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"boardMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardMemberShort"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardMemberFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardMember"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"board"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardRender"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardMembers"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<BoardMemberCreatedSubscription, BoardMemberCreatedSubscriptionVariables>;
export const BoardMemberUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"boardMemberUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boardMemberUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardMemberFull"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardMemberShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardMember"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardMembers"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"boardMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardMemberShort"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardMemberFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardMember"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"board"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardRender"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardMembers"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<BoardMemberUpdatedSubscription, BoardMemberUpdatedSubscriptionVariables>;
export const BoardMemberDeletedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"boardMemberDeleted"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boardMemberDeleted"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardMemberFull"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardMemberShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardMember"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardMembers"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"boardMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardMemberShort"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardMemberFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardMember"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"board"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardRender"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardMembers"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<BoardMemberDeletedSubscription, BoardMemberDeletedSubscriptionVariables>;
export const CreateBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBoardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardRender"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]} as unknown as DocumentNode<CreateBoardMutation, CreateBoardMutationVariables>;
export const UpdateBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBoardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardRender"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]} as unknown as DocumentNode<UpdateBoardMutation, UpdateBoardMutationVariables>;
export const DeleteBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardId"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<DeleteBoardMutation, DeleteBoardMutationVariables>;
export const BoardCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"boardCreated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boardCreated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardRender"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardMembers"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardMemberShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardMember"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardMembers"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"boardMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardMemberShort"}}]}}]}}]} as unknown as DocumentNode<BoardCreatedSubscription, BoardCreatedSubscriptionVariables>;
export const BoardUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"boardUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boardUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardRender"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardMembers"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardMemberShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardMember"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardMembers"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"boardMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardMemberShort"}}]}}]}}]} as unknown as DocumentNode<BoardUpdatedSubscription, BoardUpdatedSubscriptionVariables>;
export const BoardDeletedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"boardDeleted"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boardDeleted"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardRender"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardMembers"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardMemberShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardMember"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardMembers"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"boardMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardMemberShort"}}]}}]}}]} as unknown as DocumentNode<BoardDeletedSubscription, BoardDeletedSubscriptionVariables>;
export const CreateCardCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createCardComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCardCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCardComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardCommentRender"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardCommentRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardComment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}}]}}]} as unknown as DocumentNode<CreateCardCommentMutation, CreateCardCommentMutationVariables>;
export const UpdateCardCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateCardComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCardCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCardComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardCommentRender"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardCommentRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardComment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}}]}}]} as unknown as DocumentNode<UpdateCardCommentMutation, UpdateCardCommentMutationVariables>;
export const DeleteCardCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteCardComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCardComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardCommentId"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardCommentId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardComment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<DeleteCardCommentMutation, DeleteCardCommentMutationVariables>;
export const CardCommentCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"cardCommentCreated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CardCommentSubscriptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commentCreated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardCommentRender"}},{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardId"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardCommentRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardComment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<CardCommentCreatedSubscription, CardCommentCreatedSubscriptionVariables>;
export const CardCommentUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"cardCommentUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CardCommentSubscriptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commentUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardCommentRender"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardCommentRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardComment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}}]}}]} as unknown as DocumentNode<CardCommentUpdatedSubscription, CardCommentUpdatedSubscriptionVariables>;
export const CardCommentDeletedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"cardCommentDeleted"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CardCommentSubscriptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commentDeleted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardCommentId"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardCommentId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardComment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<CardCommentDeletedSubscription, CardCommentDeletedSubscriptionVariables>;
export const CardHistoryCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"cardHistoryCreated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CardHistorySubscriptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"historyCreated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardHistoryRender"}},{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardId"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardHistoryRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payload"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<CardHistoryCreatedSubscription, CardHistoryCreatedSubscriptionVariables>;
export const CreateCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardRender"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardSort"}},{"kind":"Field","name":{"kind":"Name","value":"column"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnId"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardSort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColumnId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Column"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<CreateCardMutation, CreateCardMutationVariables>;
export const UpdateCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardRender"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardSort"}},{"kind":"Field","name":{"kind":"Name","value":"column"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnId"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardSort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColumnId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Column"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<UpdateCardMutation, UpdateCardMutationVariables>;
export const MoveCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"moveCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MoveCardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moveCard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardRender"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardSort"}},{"kind":"Field","name":{"kind":"Name","value":"column"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"sourceColumn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnId"}},{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"targetColumn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnId"}},{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardId"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardSort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColumnId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Column"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<MoveCardMutation, MoveCardMutationVariables>;
export const AttachTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"attachTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardId"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagRender"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]} as unknown as DocumentNode<AttachTagMutation, AttachTagMutationVariables>;
export const UpdateCardOwnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateCardOwner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCardOwnerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCardOwner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardId"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<UpdateCardOwnerMutation, UpdateCardOwnerMutationVariables>;
export const UpdateCardAssigneesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateCardAssignees"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCardAssigneesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCardAssignees"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardId"}},{"kind":"Field","name":{"kind":"Name","value":"assignees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<UpdateCardAssigneesMutation, UpdateCardAssigneesMutationVariables>;
export const CardCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"cardCreated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CardSubscriptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cardCreated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardRender"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardSort"}},{"kind":"Field","name":{"kind":"Name","value":"column"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnId"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardSort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColumnId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Column"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<CardCreatedSubscription, CardCreatedSubscriptionVariables>;
export const CardUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"cardUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CardSubscriptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cardUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardRender"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardSort"}},{"kind":"Field","name":{"kind":"Name","value":"column"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"board"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardId"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagRender"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardSort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColumnId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Column"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]} as unknown as DocumentNode<CardUpdatedSubscription, CardUpdatedSubscriptionVariables>;
export const CardMovedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"cardMoved"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CardSubscriptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cardMoved"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardRender"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardSort"}},{"kind":"Field","name":{"kind":"Name","value":"column"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"sourceColumn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"targetColumn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnId"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardSort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColumnId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Column"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<CardMovedSubscription, CardMovedSubscriptionVariables>;
export const CreateColumnDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createColumn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateColumnInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createColumn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnRender"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnSort"}},{"kind":"Field","name":{"kind":"Name","value":"board"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardId"}},{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnId"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColumnRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Column"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"maxCardsCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColumnSort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Column"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColumnId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Column"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<CreateColumnMutation, CreateColumnMutationVariables>;
export const UpdateColumnDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateColumn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateColumnInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateColumn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnRender"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColumnRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Column"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"maxCardsCount"}}]}}]} as unknown as DocumentNode<UpdateColumnMutation, UpdateColumnMutationVariables>;
export const MoveColumnDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"moveColumn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MoveColumnInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moveColumn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnRender"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnSort"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColumnRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Column"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"maxCardsCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColumnSort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Column"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}}]}}]} as unknown as DocumentNode<MoveColumnMutation, MoveColumnMutationVariables>;
export const DeleteColumnDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteColumn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteColumn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnId"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColumnId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Column"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<DeleteColumnMutation, DeleteColumnMutationVariables>;
export const ColumnCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"columnCreated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ColumnSubscriptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"columnCreated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnRender"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnSort"}},{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardRender"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardSort"}},{"kind":"Field","name":{"kind":"Name","value":"column"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnId"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColumnRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Column"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"maxCardsCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColumnSort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Column"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardSort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColumnId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Column"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<ColumnCreatedSubscription, ColumnCreatedSubscriptionVariables>;
export const ColumnUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"columnUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ColumnSubscriptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"columnUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnRender"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnSort"}},{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardRender"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardSort"}},{"kind":"Field","name":{"kind":"Name","value":"column"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnId"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColumnRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Column"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"maxCardsCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColumnSort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Column"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardSort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColumnId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Column"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<ColumnUpdatedSubscription, ColumnUpdatedSubscriptionVariables>;
export const ColumnDeletedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"columnDeleted"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ColumnSubscriptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"columnDeleted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnRender"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnSort"}},{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardRender"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardSort"}},{"kind":"Field","name":{"kind":"Name","value":"column"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnId"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColumnRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Column"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"maxCardsCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColumnSort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Column"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardSort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColumnId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Column"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<ColumnDeletedSubscription, ColumnDeletedSubscriptionVariables>;
export const ReadNotificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"readNotification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"readNotification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotificationRender"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardName"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotificationRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Notification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"isRead"}},{"kind":"Field","name":{"kind":"Name","value":"actor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardOwnerAddedNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardName"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardOwnerRemovedNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardName"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardAssigneesAddedNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardName"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardAssigneesRemovedNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardName"}}]}}]}}]}}]} as unknown as DocumentNode<ReadNotificationMutation, ReadNotificationMutationVariables>;
export const NotificationCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"notificationCreated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationSubscriptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notificationCreated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotificationRender"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardName"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotificationRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Notification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"isRead"}},{"kind":"Field","name":{"kind":"Name","value":"actor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardOwnerAddedNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardName"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardOwnerRemovedNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardName"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardAssigneesAddedNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardName"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardAssigneesRemovedNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardName"}}]}}]}}]}}]} as unknown as DocumentNode<NotificationCreatedSubscription, NotificationCreatedSubscriptionVariables>;
export const NotificationUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"notificationUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationSubscriptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notificationUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotificationRender"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardName"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotificationRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Notification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"isRead"}},{"kind":"Field","name":{"kind":"Name","value":"actor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardOwnerAddedNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardName"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardOwnerRemovedNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardName"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardAssigneesAddedNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardName"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardAssigneesRemovedNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardName"}}]}}]}}]}}]} as unknown as DocumentNode<NotificationUpdatedSubscription, NotificationUpdatedSubscriptionVariables>;
export const NotificationUnreadCountUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"notificationUnreadCountUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UnreadNotificationsCountUpdatedInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notificationUnreadCountUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<NotificationUnreadCountUpdatedSubscription, NotificationUnreadCountUpdatedSubscriptionVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RefreshDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"refresh"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refresh"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<RefreshMutation, RefreshMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const WhoAmIDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"whoAmI"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"whoAmI"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"boardMemberships"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"board"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardId"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<WhoAmIQuery, WhoAmIQueryVariables>;
export const CreateTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTagInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagRender"}},{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"board"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardId"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagRender"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<CreateTagMutation, CreateTagMutationVariables>;
export const UpdateTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTagInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagRender"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]} as unknown as DocumentNode<UpdateTagMutation, UpdateTagMutationVariables>;
export const DeleteTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagId"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<DeleteTagMutation, DeleteTagMutationVariables>;
export const TagCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"tagCreated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TagSubscriptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tagCreated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagRender"}},{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"board"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardId"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagRender"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<TagCreatedSubscription, TagCreatedSubscriptionVariables>;
export const TagUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"tagUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TagSubscriptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tagUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagRender"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]} as unknown as DocumentNode<TagUpdatedSubscription, TagUpdatedSubscriptionVariables>;
export const TagDeletedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"tagDeleted"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TagSubscriptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tagDeleted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagId"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<TagDeletedSubscription, TagDeletedSubscriptionVariables>;
export const UsersListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"usersList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<UsersListQuery, UsersListQueryVariables>;
export const BoardMembersSelectDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"boardMembersSelectData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"board"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardRender"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardMembers"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardMemberShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardMember"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardMembers"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"boardMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardMemberShort"}}]}}]}}]} as unknown as DocumentNode<BoardMembersSelectDataQuery, BoardMembersSelectDataQueryVariables>;
export const GetNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getNotifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetNotificationsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotificationPaginatedRender"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardName"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotificationRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Notification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"isRead"}},{"kind":"Field","name":{"kind":"Name","value":"actor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardOwnerAddedNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardName"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardOwnerRemovedNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardName"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardAssigneesAddedNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardName"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardAssigneesRemovedNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardName"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotificationPaginatedRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationPaginated"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotificationRender"}}]}}]}}]}}]} as unknown as DocumentNode<GetNotificationsQuery, GetNotificationsQueryVariables>;
export const CountUnreadNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"countUnreadNotifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CountNotificationsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countUnreadNotifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<CountUnreadNotificationsQuery, CountUnreadNotificationsQueryVariables>;
export const AllBoardsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allBoards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardRender"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]} as unknown as DocumentNode<AllBoardsQuery, AllBoardsQueryVariables>;
export const SearchCardsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchCards"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchCardsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchCards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardRender"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<SearchCardsQuery, SearchCardsQueryVariables>;
export const BoardsGridDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"boardsGridData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardRender"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardMembers"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardMemberShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoardMember"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardMembers"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"boardMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardMemberShort"}}]}}]}}]} as unknown as DocumentNode<BoardsGridDataQuery, BoardsGridDataQueryVariables>;
export const CardCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"cardComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CardByIdInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cardById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardCommentPaginatedRender"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardCommentRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardComment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardCommentPaginatedRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardCommentPaginated"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardCommentRender"}}]}}]}}]}}]} as unknown as DocumentNode<CardCommentsQuery, CardCommentsQueryVariables>;
export const CardHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"cardHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CardByIdInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cardById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"history"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardHistoryPaginatedRender"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardHistoryRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payload"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardHistoryPaginatedRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardHistoryPaginated"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardHistoryRender"}}]}}]}}]}}]} as unknown as DocumentNode<CardHistoryQuery, CardHistoryQueryVariables>;
export const GetCardByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCardById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CardByIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cardById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardRender"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserShort"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"board"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardId"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagRender"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]} as unknown as DocumentNode<GetCardByIdQuery, GetCardByIdQueryVariables>;
export const GetBoardDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBoardData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"board"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardRender"}},{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnRender"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnSort"}},{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardRender"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardSort"}},{"kind":"Field","name":{"kind":"Name","value":"column"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnId"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColumnRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Column"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"maxCardsCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColumnSort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Column"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardRender"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardSort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColumnId"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Column"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<GetBoardDataQuery, GetBoardDataQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "Notification": [
      "CardAssigneesAddedNotification",
      "CardAssigneesRemovedNotification",
      "CardOwnerAddedNotification",
      "CardOwnerRemovedNotification"
    ]
  }
};
      export default result;
    