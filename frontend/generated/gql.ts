/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment BoardMemberId on BoardMember {\n    id\n  }\n\n  fragment BoardMemberShort on BoardMember {\n    id\n    user {\n      ...UserShort\n    }\n    role\n  }\n\n  fragment BoardMemberFull on BoardMember {\n    id\n    board {\n      ...BoardRender\n      ...BoardMembers\n    }\n    user {\n      ...UserShort\n    }\n    role\n  }\n": typeof types.BoardMemberIdFragmentDoc,
    "\n  mutation createBoardMember($input: CreateBoardMemberInput!) {\n    createBoardMember(input: $input) {\n      board {\n        ...BoardId\n        boardMembers {\n          user {\n            ...UserId\n          }\n          role\n        }\n      }\n    }\n  }\n": typeof types.CreateBoardMemberDocument,
    "\n  mutation updateBoardMember($input: UpdateBoardMemberInput!) {\n    updateBoardMember(input: $input) {\n      board {\n        ...BoardId\n        boardMembers {\n          user {\n            ...UserId\n          }\n          role\n        }\n      }\n    }\n  }\n": typeof types.UpdateBoardMemberDocument,
    "\n  mutation deleteBoardMember($input: DeleteBoardMemberInput!) {\n    deleteBoardMember(input: $input) {\n      ...BoardMemberId\n    }\n  }\n": typeof types.DeleteBoardMemberDocument,
    "\n  subscription boardMemberCreated {\n    boardMemberCreated {\n      ...BoardMemberFull\n    }\n  }\n": typeof types.BoardMemberCreatedDocument,
    "\n  subscription boardMemberUpdated {\n    boardMemberUpdated {\n      ...BoardMemberFull\n    }\n  }\n": typeof types.BoardMemberUpdatedDocument,
    "\n  subscription boardMemberDeleted {\n    boardMemberDeleted {\n      ...BoardMemberFull\n    }\n  }\n": typeof types.BoardMemberDeletedDocument,
    "\n  fragment BoardId on Board {\n    id\n  }\n\n  fragment BoardRender on Board {\n    id\n    name\n    color\n  }\n\n  fragment BoardMembers on Board {\n    id\n    boardMembers {\n      ...BoardMemberShort\n    }\n  }\n": typeof types.BoardIdFragmentDoc,
    "\n  mutation createBoard($input: CreateBoardInput!) {\n    createBoard(input: $input) {\n      ...BoardRender\n    }\n  }\n": typeof types.CreateBoardDocument,
    "\n  mutation updateBoard($input: UpdateBoardInput!) {\n    updateBoard(input: $input) {\n      ...BoardRender\n    }\n  }\n": typeof types.UpdateBoardDocument,
    "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId) {\n      ...BoardId\n    }\n  }\n": typeof types.DeleteBoardDocument,
    "\n  subscription boardCreated {\n    boardCreated {\n      ...BoardRender\n      ...BoardMembers\n    }\n  }\n": typeof types.BoardCreatedDocument,
    "\n  subscription boardUpdated {\n    boardUpdated {\n      ...BoardRender\n      ...BoardMembers\n    }\n  }\n": typeof types.BoardUpdatedDocument,
    "\n  subscription boardDeleted {\n    boardDeleted {\n      ...BoardRender\n      ...BoardMembers\n    }\n  }\n": typeof types.BoardDeletedDocument,
    "\n  fragment CardCommentId on CardComment {\n    id\n  }\n\n  fragment CardCommentRender on CardComment {\n    id\n    text\n    createdAt\n    user {\n      ...UserShort\n    }\n  }\n\n  fragment CardCommentPaginatedRender on CardCommentPaginated {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      cursor\n      node {\n        ...CardCommentRender\n      }\n    }\n  }\n": typeof types.CardCommentIdFragmentDoc,
    "\n  mutation createCardComment($input: CreateCardCommentInput!) {\n    createCardComment(input: $input) {\n      ...CardCommentRender\n    }\n  }\n": typeof types.CreateCardCommentDocument,
    "\n  mutation updateCardComment($input: UpdateCardCommentInput!) {\n    updateCardComment(input: $input) {\n      ...CardCommentRender\n    }\n  }\n": typeof types.UpdateCardCommentDocument,
    "\n  mutation deleteCardComment($boardId: ID!, $commentId: ID!) {\n    deleteCardComment(boardId: $boardId, commentId: $commentId) {\n      ...CardCommentId\n    }\n  }\n": typeof types.DeleteCardCommentDocument,
    "\n  subscription cardCommentCreated($input: CardCommentSubscriptionInput!) {\n    commentCreated(input: $input) {\n      ...CardCommentRender\n      card {\n        ...CardId\n      }\n    }\n  }\n": typeof types.CardCommentCreatedDocument,
    "\n  subscription cardCommentUpdated($input: CardCommentSubscriptionInput!) {\n    commentUpdated(input: $input) {\n      ...CardCommentRender\n    }\n  }\n": typeof types.CardCommentUpdatedDocument,
    "\n  subscription cardCommentDeleted($input: CardCommentSubscriptionInput!) {\n    commentDeleted(input: $input) {\n      ...CardCommentId\n    }\n  }\n": typeof types.CardCommentDeletedDocument,
    "\n  fragment PartialCardRender on PartialCard {\n    name\n    description\n    tags {\n      ...TagRender\n    }\n  }\n\n  fragment CardHistoryId on CardHistory {\n    id\n  }\n\n  fragment CardHistoryRender on CardHistory {\n    id\n    createdAt\n    author {\n      ...UserShort\n    }\n    payload\n  }\n\n  fragment CardHistoryPaginatedRender on CardHistoryPaginated {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      cursor\n      node {\n        ...CardHistoryRender\n      }\n    }\n  }\n": typeof types.PartialCardRenderFragmentDoc,
    "\n  subscription cardHistoryCreated($input: CardHistorySubscriptionInput!) {\n    historyCreated(input: $input) {\n      ...CardHistoryRender\n      card {\n        ...CardId\n      }\n    }\n  }\n": typeof types.CardHistoryCreatedDocument,
    "\n  fragment CardId on Card {\n    id\n  }\n\n  fragment CardSort on Card {\n    id\n    rank\n  }\n\n  fragment CardName on Card {\n    id\n    name\n  }\n\n  fragment CardRender on Card {\n    id\n    name\n    description\n  }\n": typeof types.CardIdFragmentDoc,
    "\n  mutation createCard($input: CreateCardInput!) {\n    createCard(input: $input) {\n      ...CardRender\n      ...CardSort\n      column {\n        ...ColumnId\n      }\n    }\n  }\n": typeof types.CreateCardDocument,
    "\n  mutation updateCard($input: UpdateCardInput!) {\n    updateCard(input: $input) {\n      ...CardRender\n      ...CardSort\n      column {\n        ...ColumnId\n      }\n    }\n  }\n": typeof types.UpdateCardDocument,
    "\n  mutation moveCard($input: MoveCardInput!) {\n    moveCard(input: $input) {\n      card {\n        ...CardRender\n        ...CardSort\n        column {\n          id\n        }\n      }\n      sourceColumn {\n        ...ColumnId\n        cards {\n          ...CardId\n        }\n      }\n      targetColumn {\n        ...ColumnId\n        cards {\n          ...CardId\n        }\n      }\n    }\n  }\n": typeof types.MoveCardDocument,
    "\n  mutation attachTag($input: UpdateCardInput!) {\n    updateCard(input: $input) {\n      ...CardId\n      tags {\n        ...TagRender\n      }\n    }\n  }\n": typeof types.AttachTagDocument,
    "\n  mutation updateCardOwner($input: UpdateCardOwnerInput!) {\n    updateCardOwner(input: $input) {\n      ...CardId\n      owner {\n        ...UserShort\n      }\n    }\n  }\n": typeof types.UpdateCardOwnerDocument,
    "\n  mutation updateCardAssignees($input: UpdateCardAssigneesInput!) {\n    updateCardAssignees(input: $input) {\n      ...CardId\n      assignees {\n        ...UserShort\n      }\n    }\n  }\n": typeof types.UpdateCardAssigneesDocument,
    "\n  subscription cardCreated($input: CardSubscriptionInput!) {\n    cardCreated(input: $input) {\n      ...CardRender\n      ...CardSort\n      column {\n        ...ColumnId\n      }\n    }\n  }\n": typeof types.CardCreatedDocument,
    "\n  subscription cardUpdated($input: CardSubscriptionInput!) {\n    cardUpdated(input: $input) {\n      ...CardRender\n      ...CardSort\n      column {\n        ...ColumnId\n      }\n      owner {\n        ...UserShort\n      }\n      assignees {\n        ...UserShort\n      }\n      tags {\n        ...TagId\n      }\n      board {\n        ...BoardId\n        tags {\n          ...TagRender\n        }\n      }\n    }\n  }\n": typeof types.CardUpdatedDocument,
    "\n  subscription cardMoved($input: CardSubscriptionInput!) {\n    cardMoved(input: $input) {\n      card {\n        ...CardRender\n        ...CardSort\n        column {\n          ...ColumnId\n        }\n      }\n      sourceColumn {\n        ...ColumnId\n      }\n      targetColumn {\n        ...ColumnId\n      }\n    }\n  }\n": typeof types.CardMovedDocument,
    "\n  fragment ColumnId on Column {\n    id\n  }\n\n  fragment ColumnSort on Column {\n    id\n    rank\n  }\n\n  fragment ColumnRender on Column {\n    id\n    name\n    color\n    maxCardsCount\n  }\n": typeof types.ColumnIdFragmentDoc,
    "\n  mutation createColumn($input: CreateColumnInput!) {\n    createColumn(input: $input) {\n      ...ColumnRender\n      ...ColumnSort\n      board {\n        ...BoardId\n        columns {\n          ...ColumnId\n        }\n      }\n    }\n  }\n": typeof types.CreateColumnDocument,
    "\n  mutation updateColumn($input: UpdateColumnInput!) {\n    updateColumn(input: $input) {\n      ...ColumnRender\n    }\n  }\n": typeof types.UpdateColumnDocument,
    "\n  mutation moveColumn($input: MoveColumnInput!) {\n    moveColumn(input: $input) {\n      ...ColumnRender\n      ...ColumnSort\n    }\n  }\n": typeof types.MoveColumnDocument,
    "\n  mutation deleteColumn($boardId: ID!, $id: ID!) {\n    deleteColumn(boardId: $boardId, id: $id) {\n      ...ColumnId\n    }\n  }\n": typeof types.DeleteColumnDocument,
    "\n  subscription columnCreated($input: ColumnSubscriptionInput!) {\n    columnCreated(input: $input) {\n      ...ColumnRender\n      ...ColumnSort\n      cards {\n        ...CardRender\n        ...CardSort\n        column {\n          ...ColumnId\n        }\n      }\n    }\n  }\n": typeof types.ColumnCreatedDocument,
    "\n  subscription columnUpdated($input: ColumnSubscriptionInput!) {\n    columnUpdated(input: $input) {\n      ...ColumnRender\n      ...ColumnSort\n      cards {\n        ...CardRender\n        ...CardSort\n        column {\n          ...ColumnId\n        }\n      }\n    }\n  }\n": typeof types.ColumnUpdatedDocument,
    "\n  subscription columnDeleted($input: ColumnSubscriptionInput!) {\n    columnDeleted(input: $input) {\n      ...ColumnRender\n      ...ColumnSort\n      cards {\n        ...CardRender\n        ...CardSort\n        column {\n          ...ColumnId\n        }\n      }\n    }\n  }\n": typeof types.ColumnDeletedDocument,
    "\n  fragment NotificationRender on Notification {\n    id\n    type\n    createdAt\n    isRead\n\n    actor {\n      ...UserShort\n    }\n\n    ... on CardOwnerAddedNotification {\n      card {\n        ...CardName\n      }\n    }\n\n    ... on CardOwnerRemovedNotification {\n      card {\n        ...CardName\n      }\n    }\n\n    ... on CardAssigneesAddedNotification {\n      card {\n        ...CardName\n      }\n    }\n\n    ... on CardAssigneesRemovedNotification {\n      card {\n        ...CardName\n      }\n    }\n  }\n\n  fragment NotificationPaginatedRender on NotificationPaginated {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      cursor\n      node {\n        ...NotificationRender\n      }\n    }\n  }\n": typeof types.NotificationRenderFragmentDoc,
    "\n  mutation readNotification($boardId: ID!, $id: ID!) {\n    readNotification(boardId: $boardId, id: $id) {\n      ...NotificationRender\n    }\n  }\n": typeof types.ReadNotificationDocument,
    "\n  subscription notificationCreated($input: NotificationSubscriptionInput!) {\n    notificationCreated(input: $input) {\n      ...NotificationRender\n    }\n  }\n": typeof types.NotificationCreatedDocument,
    "\n  subscription notificationUpdated($input: NotificationSubscriptionInput!) {\n    notificationUpdated(input: $input) {\n      ...NotificationRender\n    }\n  }\n": typeof types.NotificationUpdatedDocument,
    "\n  subscription notificationUnreadCountUpdated($input: UnreadNotificationsCountUpdatedInput!) {\n    notificationUnreadCountUpdated(input: $input)\n  }\n": typeof types.NotificationUnreadCountUpdatedDocument,
    "\n  mutation login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation logout {\n    logout\n  }\n": typeof types.LogoutDocument,
    "\n  mutation refresh {\n    refresh {\n      accessToken\n    }\n  }\n": typeof types.RefreshDocument,
    "\n  mutation createUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      ...UserShort\n    }\n  }\n": typeof types.CreateUserDocument,
    "\n  query whoAmI {\n    whoAmI {\n      id\n      firstName\n      lastName\n      email\n      boardMemberships {\n        id\n        role\n        board {\n          ...BoardId\n        }\n      }\n    }\n  }\n": typeof types.WhoAmIDocument,
    "\n  fragment TagId on Tag {\n    id\n  }\n\n  fragment TagRender on Tag {\n    id\n    name\n    color\n  }\n": typeof types.TagIdFragmentDoc,
    "\n  mutation createTag($input: CreateTagInput!) {\n    createTag(input: $input) {\n      ...TagRender\n      cards {\n        ...CardId\n      }\n      board {\n        ...BoardId\n        tags {\n          ...TagRender\n        }\n      }\n    }\n  }\n": typeof types.CreateTagDocument,
    "\n  mutation updateTag($input: UpdateTagInput!) {\n    updateTag(input: $input) {\n      ...TagRender\n    }\n  }\n": typeof types.UpdateTagDocument,
    "\n  mutation deleteTag($boardId: ID!, $id: ID!) {\n    deleteTag(boardId: $boardId, id: $id) {\n      ...TagId\n    }\n  }\n": typeof types.DeleteTagDocument,
    "\n  subscription tagCreated($input: TagSubscriptionInput!) {\n    tagCreated(input: $input) {\n      ...TagRender\n      cards {\n        ...CardId\n      }\n      board {\n        ...BoardId\n        tags {\n          ...TagRender\n        }\n      }\n    }\n  }\n": typeof types.TagCreatedDocument,
    "\n  subscription tagUpdated($input: TagSubscriptionInput!) {\n    tagUpdated(input: $input) {\n      ...TagRender\n    }\n  }\n": typeof types.TagUpdatedDocument,
    "\n  subscription tagDeleted($input: TagSubscriptionInput!) {\n    tagDeleted(input: $input) {\n      ...TagId\n    }\n  }\n": typeof types.TagDeletedDocument,
    "\n  fragment UserId on User {\n    id\n  }\n\n  fragment UserShort on User {\n    id\n    firstName\n    lastName\n    email\n  }\n": typeof types.UserIdFragmentDoc,
    "\n  query usersList {\n    users {\n      ...UserShort\n    }\n  }\n": typeof types.UsersListDocument,
    "\n  query boardMembersSelectData($boardId: ID!) {\n    board(boardId: $boardId) {\n      ...BoardRender\n      ...BoardMembers\n    }\n  }\n": typeof types.BoardMembersSelectDataDocument,
    "\n  query getNotifications($input: GetNotificationsInput!) {\n    notifications(input: $input) {\n      ...NotificationPaginatedRender\n    }\n  }\n": typeof types.GetNotificationsDocument,
    "\n  query countUnreadNotifications($input: CountNotificationsInput!) {\n    countUnreadNotifications(input: $input)\n  }\n": typeof types.CountUnreadNotificationsDocument,
    "\n  query allBoards {\n    boards {\n      ...BoardRender\n    }\n  }\n": typeof types.AllBoardsDocument,
    "\n  query searchCards($input: SearchCardsInput!) {\n    searchCards(input: $input) {\n      ...CardRender\n    }\n  }\n": typeof types.SearchCardsDocument,
    "\n  query boardsGridData {\n    boards {\n      ...BoardRender\n      ...BoardMembers\n    }\n  }\n": typeof types.BoardsGridDataDocument,
    "\n  query cardComments($input: CardByIdInput!, $pagination: PaginationArgs!) {\n    cardById(input: $input) {\n      id\n      comments(input: $pagination) {\n        ...CardCommentPaginatedRender\n      }\n    }\n  }\n": typeof types.CardCommentsDocument,
    "\n  query cardHistory($input: CardByIdInput!, $pagination: PaginationArgs!) {\n    cardById(input: $input) {\n      id\n      history(input: $pagination) {\n        ...CardHistoryPaginatedRender\n      }\n    }\n  }\n": typeof types.CardHistoryDocument,
    "\n  query getCardById($input: CardByIdInput!) {\n    cardById(input: $input) {\n      ...CardRender\n      owner {\n        ...UserShort\n      }\n      assignees {\n        ...UserShort\n      }\n      tags {\n        ...TagId\n      }\n      board {\n        ...BoardId\n        tags {\n          ...TagRender\n        }\n      }\n    }\n  }\n": typeof types.GetCardByIdDocument,
    "\n  query getBoardData($boardId: ID!) {\n    board(boardId: $boardId) {\n      ...BoardRender\n      columns {\n        ...ColumnRender\n        ...ColumnSort\n        cards {\n          ...CardRender\n          ...CardSort\n          column {\n            ...ColumnId\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetBoardDataDocument,
};
const documents: Documents = {
    "\n  fragment BoardMemberId on BoardMember {\n    id\n  }\n\n  fragment BoardMemberShort on BoardMember {\n    id\n    user {\n      ...UserShort\n    }\n    role\n  }\n\n  fragment BoardMemberFull on BoardMember {\n    id\n    board {\n      ...BoardRender\n      ...BoardMembers\n    }\n    user {\n      ...UserShort\n    }\n    role\n  }\n": types.BoardMemberIdFragmentDoc,
    "\n  mutation createBoardMember($input: CreateBoardMemberInput!) {\n    createBoardMember(input: $input) {\n      board {\n        ...BoardId\n        boardMembers {\n          user {\n            ...UserId\n          }\n          role\n        }\n      }\n    }\n  }\n": types.CreateBoardMemberDocument,
    "\n  mutation updateBoardMember($input: UpdateBoardMemberInput!) {\n    updateBoardMember(input: $input) {\n      board {\n        ...BoardId\n        boardMembers {\n          user {\n            ...UserId\n          }\n          role\n        }\n      }\n    }\n  }\n": types.UpdateBoardMemberDocument,
    "\n  mutation deleteBoardMember($input: DeleteBoardMemberInput!) {\n    deleteBoardMember(input: $input) {\n      ...BoardMemberId\n    }\n  }\n": types.DeleteBoardMemberDocument,
    "\n  subscription boardMemberCreated {\n    boardMemberCreated {\n      ...BoardMemberFull\n    }\n  }\n": types.BoardMemberCreatedDocument,
    "\n  subscription boardMemberUpdated {\n    boardMemberUpdated {\n      ...BoardMemberFull\n    }\n  }\n": types.BoardMemberUpdatedDocument,
    "\n  subscription boardMemberDeleted {\n    boardMemberDeleted {\n      ...BoardMemberFull\n    }\n  }\n": types.BoardMemberDeletedDocument,
    "\n  fragment BoardId on Board {\n    id\n  }\n\n  fragment BoardRender on Board {\n    id\n    name\n    color\n  }\n\n  fragment BoardMembers on Board {\n    id\n    boardMembers {\n      ...BoardMemberShort\n    }\n  }\n": types.BoardIdFragmentDoc,
    "\n  mutation createBoard($input: CreateBoardInput!) {\n    createBoard(input: $input) {\n      ...BoardRender\n    }\n  }\n": types.CreateBoardDocument,
    "\n  mutation updateBoard($input: UpdateBoardInput!) {\n    updateBoard(input: $input) {\n      ...BoardRender\n    }\n  }\n": types.UpdateBoardDocument,
    "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId) {\n      ...BoardId\n    }\n  }\n": types.DeleteBoardDocument,
    "\n  subscription boardCreated {\n    boardCreated {\n      ...BoardRender\n      ...BoardMembers\n    }\n  }\n": types.BoardCreatedDocument,
    "\n  subscription boardUpdated {\n    boardUpdated {\n      ...BoardRender\n      ...BoardMembers\n    }\n  }\n": types.BoardUpdatedDocument,
    "\n  subscription boardDeleted {\n    boardDeleted {\n      ...BoardRender\n      ...BoardMembers\n    }\n  }\n": types.BoardDeletedDocument,
    "\n  fragment CardCommentId on CardComment {\n    id\n  }\n\n  fragment CardCommentRender on CardComment {\n    id\n    text\n    createdAt\n    user {\n      ...UserShort\n    }\n  }\n\n  fragment CardCommentPaginatedRender on CardCommentPaginated {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      cursor\n      node {\n        ...CardCommentRender\n      }\n    }\n  }\n": types.CardCommentIdFragmentDoc,
    "\n  mutation createCardComment($input: CreateCardCommentInput!) {\n    createCardComment(input: $input) {\n      ...CardCommentRender\n    }\n  }\n": types.CreateCardCommentDocument,
    "\n  mutation updateCardComment($input: UpdateCardCommentInput!) {\n    updateCardComment(input: $input) {\n      ...CardCommentRender\n    }\n  }\n": types.UpdateCardCommentDocument,
    "\n  mutation deleteCardComment($boardId: ID!, $commentId: ID!) {\n    deleteCardComment(boardId: $boardId, commentId: $commentId) {\n      ...CardCommentId\n    }\n  }\n": types.DeleteCardCommentDocument,
    "\n  subscription cardCommentCreated($input: CardCommentSubscriptionInput!) {\n    commentCreated(input: $input) {\n      ...CardCommentRender\n      card {\n        ...CardId\n      }\n    }\n  }\n": types.CardCommentCreatedDocument,
    "\n  subscription cardCommentUpdated($input: CardCommentSubscriptionInput!) {\n    commentUpdated(input: $input) {\n      ...CardCommentRender\n    }\n  }\n": types.CardCommentUpdatedDocument,
    "\n  subscription cardCommentDeleted($input: CardCommentSubscriptionInput!) {\n    commentDeleted(input: $input) {\n      ...CardCommentId\n    }\n  }\n": types.CardCommentDeletedDocument,
    "\n  fragment PartialCardRender on PartialCard {\n    name\n    description\n    tags {\n      ...TagRender\n    }\n  }\n\n  fragment CardHistoryId on CardHistory {\n    id\n  }\n\n  fragment CardHistoryRender on CardHistory {\n    id\n    createdAt\n    author {\n      ...UserShort\n    }\n    payload\n  }\n\n  fragment CardHistoryPaginatedRender on CardHistoryPaginated {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      cursor\n      node {\n        ...CardHistoryRender\n      }\n    }\n  }\n": types.PartialCardRenderFragmentDoc,
    "\n  subscription cardHistoryCreated($input: CardHistorySubscriptionInput!) {\n    historyCreated(input: $input) {\n      ...CardHistoryRender\n      card {\n        ...CardId\n      }\n    }\n  }\n": types.CardHistoryCreatedDocument,
    "\n  fragment CardId on Card {\n    id\n  }\n\n  fragment CardSort on Card {\n    id\n    rank\n  }\n\n  fragment CardName on Card {\n    id\n    name\n  }\n\n  fragment CardRender on Card {\n    id\n    name\n    description\n  }\n": types.CardIdFragmentDoc,
    "\n  mutation createCard($input: CreateCardInput!) {\n    createCard(input: $input) {\n      ...CardRender\n      ...CardSort\n      column {\n        ...ColumnId\n      }\n    }\n  }\n": types.CreateCardDocument,
    "\n  mutation updateCard($input: UpdateCardInput!) {\n    updateCard(input: $input) {\n      ...CardRender\n      ...CardSort\n      column {\n        ...ColumnId\n      }\n    }\n  }\n": types.UpdateCardDocument,
    "\n  mutation moveCard($input: MoveCardInput!) {\n    moveCard(input: $input) {\n      card {\n        ...CardRender\n        ...CardSort\n        column {\n          id\n        }\n      }\n      sourceColumn {\n        ...ColumnId\n        cards {\n          ...CardId\n        }\n      }\n      targetColumn {\n        ...ColumnId\n        cards {\n          ...CardId\n        }\n      }\n    }\n  }\n": types.MoveCardDocument,
    "\n  mutation attachTag($input: UpdateCardInput!) {\n    updateCard(input: $input) {\n      ...CardId\n      tags {\n        ...TagRender\n      }\n    }\n  }\n": types.AttachTagDocument,
    "\n  mutation updateCardOwner($input: UpdateCardOwnerInput!) {\n    updateCardOwner(input: $input) {\n      ...CardId\n      owner {\n        ...UserShort\n      }\n    }\n  }\n": types.UpdateCardOwnerDocument,
    "\n  mutation updateCardAssignees($input: UpdateCardAssigneesInput!) {\n    updateCardAssignees(input: $input) {\n      ...CardId\n      assignees {\n        ...UserShort\n      }\n    }\n  }\n": types.UpdateCardAssigneesDocument,
    "\n  subscription cardCreated($input: CardSubscriptionInput!) {\n    cardCreated(input: $input) {\n      ...CardRender\n      ...CardSort\n      column {\n        ...ColumnId\n      }\n    }\n  }\n": types.CardCreatedDocument,
    "\n  subscription cardUpdated($input: CardSubscriptionInput!) {\n    cardUpdated(input: $input) {\n      ...CardRender\n      ...CardSort\n      column {\n        ...ColumnId\n      }\n      owner {\n        ...UserShort\n      }\n      assignees {\n        ...UserShort\n      }\n      tags {\n        ...TagId\n      }\n      board {\n        ...BoardId\n        tags {\n          ...TagRender\n        }\n      }\n    }\n  }\n": types.CardUpdatedDocument,
    "\n  subscription cardMoved($input: CardSubscriptionInput!) {\n    cardMoved(input: $input) {\n      card {\n        ...CardRender\n        ...CardSort\n        column {\n          ...ColumnId\n        }\n      }\n      sourceColumn {\n        ...ColumnId\n      }\n      targetColumn {\n        ...ColumnId\n      }\n    }\n  }\n": types.CardMovedDocument,
    "\n  fragment ColumnId on Column {\n    id\n  }\n\n  fragment ColumnSort on Column {\n    id\n    rank\n  }\n\n  fragment ColumnRender on Column {\n    id\n    name\n    color\n    maxCardsCount\n  }\n": types.ColumnIdFragmentDoc,
    "\n  mutation createColumn($input: CreateColumnInput!) {\n    createColumn(input: $input) {\n      ...ColumnRender\n      ...ColumnSort\n      board {\n        ...BoardId\n        columns {\n          ...ColumnId\n        }\n      }\n    }\n  }\n": types.CreateColumnDocument,
    "\n  mutation updateColumn($input: UpdateColumnInput!) {\n    updateColumn(input: $input) {\n      ...ColumnRender\n    }\n  }\n": types.UpdateColumnDocument,
    "\n  mutation moveColumn($input: MoveColumnInput!) {\n    moveColumn(input: $input) {\n      ...ColumnRender\n      ...ColumnSort\n    }\n  }\n": types.MoveColumnDocument,
    "\n  mutation deleteColumn($boardId: ID!, $id: ID!) {\n    deleteColumn(boardId: $boardId, id: $id) {\n      ...ColumnId\n    }\n  }\n": types.DeleteColumnDocument,
    "\n  subscription columnCreated($input: ColumnSubscriptionInput!) {\n    columnCreated(input: $input) {\n      ...ColumnRender\n      ...ColumnSort\n      cards {\n        ...CardRender\n        ...CardSort\n        column {\n          ...ColumnId\n        }\n      }\n    }\n  }\n": types.ColumnCreatedDocument,
    "\n  subscription columnUpdated($input: ColumnSubscriptionInput!) {\n    columnUpdated(input: $input) {\n      ...ColumnRender\n      ...ColumnSort\n      cards {\n        ...CardRender\n        ...CardSort\n        column {\n          ...ColumnId\n        }\n      }\n    }\n  }\n": types.ColumnUpdatedDocument,
    "\n  subscription columnDeleted($input: ColumnSubscriptionInput!) {\n    columnDeleted(input: $input) {\n      ...ColumnRender\n      ...ColumnSort\n      cards {\n        ...CardRender\n        ...CardSort\n        column {\n          ...ColumnId\n        }\n      }\n    }\n  }\n": types.ColumnDeletedDocument,
    "\n  fragment NotificationRender on Notification {\n    id\n    type\n    createdAt\n    isRead\n\n    actor {\n      ...UserShort\n    }\n\n    ... on CardOwnerAddedNotification {\n      card {\n        ...CardName\n      }\n    }\n\n    ... on CardOwnerRemovedNotification {\n      card {\n        ...CardName\n      }\n    }\n\n    ... on CardAssigneesAddedNotification {\n      card {\n        ...CardName\n      }\n    }\n\n    ... on CardAssigneesRemovedNotification {\n      card {\n        ...CardName\n      }\n    }\n  }\n\n  fragment NotificationPaginatedRender on NotificationPaginated {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      cursor\n      node {\n        ...NotificationRender\n      }\n    }\n  }\n": types.NotificationRenderFragmentDoc,
    "\n  mutation readNotification($boardId: ID!, $id: ID!) {\n    readNotification(boardId: $boardId, id: $id) {\n      ...NotificationRender\n    }\n  }\n": types.ReadNotificationDocument,
    "\n  subscription notificationCreated($input: NotificationSubscriptionInput!) {\n    notificationCreated(input: $input) {\n      ...NotificationRender\n    }\n  }\n": types.NotificationCreatedDocument,
    "\n  subscription notificationUpdated($input: NotificationSubscriptionInput!) {\n    notificationUpdated(input: $input) {\n      ...NotificationRender\n    }\n  }\n": types.NotificationUpdatedDocument,
    "\n  subscription notificationUnreadCountUpdated($input: UnreadNotificationsCountUpdatedInput!) {\n    notificationUnreadCountUpdated(input: $input)\n  }\n": types.NotificationUnreadCountUpdatedDocument,
    "\n  mutation login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n    }\n  }\n": types.LoginDocument,
    "\n  mutation logout {\n    logout\n  }\n": types.LogoutDocument,
    "\n  mutation refresh {\n    refresh {\n      accessToken\n    }\n  }\n": types.RefreshDocument,
    "\n  mutation createUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      ...UserShort\n    }\n  }\n": types.CreateUserDocument,
    "\n  query whoAmI {\n    whoAmI {\n      id\n      firstName\n      lastName\n      email\n      boardMemberships {\n        id\n        role\n        board {\n          ...BoardId\n        }\n      }\n    }\n  }\n": types.WhoAmIDocument,
    "\n  fragment TagId on Tag {\n    id\n  }\n\n  fragment TagRender on Tag {\n    id\n    name\n    color\n  }\n": types.TagIdFragmentDoc,
    "\n  mutation createTag($input: CreateTagInput!) {\n    createTag(input: $input) {\n      ...TagRender\n      cards {\n        ...CardId\n      }\n      board {\n        ...BoardId\n        tags {\n          ...TagRender\n        }\n      }\n    }\n  }\n": types.CreateTagDocument,
    "\n  mutation updateTag($input: UpdateTagInput!) {\n    updateTag(input: $input) {\n      ...TagRender\n    }\n  }\n": types.UpdateTagDocument,
    "\n  mutation deleteTag($boardId: ID!, $id: ID!) {\n    deleteTag(boardId: $boardId, id: $id) {\n      ...TagId\n    }\n  }\n": types.DeleteTagDocument,
    "\n  subscription tagCreated($input: TagSubscriptionInput!) {\n    tagCreated(input: $input) {\n      ...TagRender\n      cards {\n        ...CardId\n      }\n      board {\n        ...BoardId\n        tags {\n          ...TagRender\n        }\n      }\n    }\n  }\n": types.TagCreatedDocument,
    "\n  subscription tagUpdated($input: TagSubscriptionInput!) {\n    tagUpdated(input: $input) {\n      ...TagRender\n    }\n  }\n": types.TagUpdatedDocument,
    "\n  subscription tagDeleted($input: TagSubscriptionInput!) {\n    tagDeleted(input: $input) {\n      ...TagId\n    }\n  }\n": types.TagDeletedDocument,
    "\n  fragment UserId on User {\n    id\n  }\n\n  fragment UserShort on User {\n    id\n    firstName\n    lastName\n    email\n  }\n": types.UserIdFragmentDoc,
    "\n  query usersList {\n    users {\n      ...UserShort\n    }\n  }\n": types.UsersListDocument,
    "\n  query boardMembersSelectData($boardId: ID!) {\n    board(boardId: $boardId) {\n      ...BoardRender\n      ...BoardMembers\n    }\n  }\n": types.BoardMembersSelectDataDocument,
    "\n  query getNotifications($input: GetNotificationsInput!) {\n    notifications(input: $input) {\n      ...NotificationPaginatedRender\n    }\n  }\n": types.GetNotificationsDocument,
    "\n  query countUnreadNotifications($input: CountNotificationsInput!) {\n    countUnreadNotifications(input: $input)\n  }\n": types.CountUnreadNotificationsDocument,
    "\n  query allBoards {\n    boards {\n      ...BoardRender\n    }\n  }\n": types.AllBoardsDocument,
    "\n  query searchCards($input: SearchCardsInput!) {\n    searchCards(input: $input) {\n      ...CardRender\n    }\n  }\n": types.SearchCardsDocument,
    "\n  query boardsGridData {\n    boards {\n      ...BoardRender\n      ...BoardMembers\n    }\n  }\n": types.BoardsGridDataDocument,
    "\n  query cardComments($input: CardByIdInput!, $pagination: PaginationArgs!) {\n    cardById(input: $input) {\n      id\n      comments(input: $pagination) {\n        ...CardCommentPaginatedRender\n      }\n    }\n  }\n": types.CardCommentsDocument,
    "\n  query cardHistory($input: CardByIdInput!, $pagination: PaginationArgs!) {\n    cardById(input: $input) {\n      id\n      history(input: $pagination) {\n        ...CardHistoryPaginatedRender\n      }\n    }\n  }\n": types.CardHistoryDocument,
    "\n  query getCardById($input: CardByIdInput!) {\n    cardById(input: $input) {\n      ...CardRender\n      owner {\n        ...UserShort\n      }\n      assignees {\n        ...UserShort\n      }\n      tags {\n        ...TagId\n      }\n      board {\n        ...BoardId\n        tags {\n          ...TagRender\n        }\n      }\n    }\n  }\n": types.GetCardByIdDocument,
    "\n  query getBoardData($boardId: ID!) {\n    board(boardId: $boardId) {\n      ...BoardRender\n      columns {\n        ...ColumnRender\n        ...ColumnSort\n        cards {\n          ...CardRender\n          ...CardSort\n          column {\n            ...ColumnId\n          }\n        }\n      }\n    }\n  }\n": types.GetBoardDataDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BoardMemberId on BoardMember {\n    id\n  }\n\n  fragment BoardMemberShort on BoardMember {\n    id\n    user {\n      ...UserShort\n    }\n    role\n  }\n\n  fragment BoardMemberFull on BoardMember {\n    id\n    board {\n      ...BoardRender\n      ...BoardMembers\n    }\n    user {\n      ...UserShort\n    }\n    role\n  }\n"): (typeof documents)["\n  fragment BoardMemberId on BoardMember {\n    id\n  }\n\n  fragment BoardMemberShort on BoardMember {\n    id\n    user {\n      ...UserShort\n    }\n    role\n  }\n\n  fragment BoardMemberFull on BoardMember {\n    id\n    board {\n      ...BoardRender\n      ...BoardMembers\n    }\n    user {\n      ...UserShort\n    }\n    role\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoardMember($input: CreateBoardMemberInput!) {\n    createBoardMember(input: $input) {\n      board {\n        ...BoardId\n        boardMembers {\n          user {\n            ...UserId\n          }\n          role\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createBoardMember($input: CreateBoardMemberInput!) {\n    createBoardMember(input: $input) {\n      board {\n        ...BoardId\n        boardMembers {\n          user {\n            ...UserId\n          }\n          role\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoardMember($input: UpdateBoardMemberInput!) {\n    updateBoardMember(input: $input) {\n      board {\n        ...BoardId\n        boardMembers {\n          user {\n            ...UserId\n          }\n          role\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoardMember($input: UpdateBoardMemberInput!) {\n    updateBoardMember(input: $input) {\n      board {\n        ...BoardId\n        boardMembers {\n          user {\n            ...UserId\n          }\n          role\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBoardMember($input: DeleteBoardMemberInput!) {\n    deleteBoardMember(input: $input) {\n      ...BoardMemberId\n    }\n  }\n"): (typeof documents)["\n  mutation deleteBoardMember($input: DeleteBoardMemberInput!) {\n    deleteBoardMember(input: $input) {\n      ...BoardMemberId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription boardMemberCreated {\n    boardMemberCreated {\n      ...BoardMemberFull\n    }\n  }\n"): (typeof documents)["\n  subscription boardMemberCreated {\n    boardMemberCreated {\n      ...BoardMemberFull\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription boardMemberUpdated {\n    boardMemberUpdated {\n      ...BoardMemberFull\n    }\n  }\n"): (typeof documents)["\n  subscription boardMemberUpdated {\n    boardMemberUpdated {\n      ...BoardMemberFull\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription boardMemberDeleted {\n    boardMemberDeleted {\n      ...BoardMemberFull\n    }\n  }\n"): (typeof documents)["\n  subscription boardMemberDeleted {\n    boardMemberDeleted {\n      ...BoardMemberFull\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BoardId on Board {\n    id\n  }\n\n  fragment BoardRender on Board {\n    id\n    name\n    color\n  }\n\n  fragment BoardMembers on Board {\n    id\n    boardMembers {\n      ...BoardMemberShort\n    }\n  }\n"): (typeof documents)["\n  fragment BoardId on Board {\n    id\n  }\n\n  fragment BoardRender on Board {\n    id\n    name\n    color\n  }\n\n  fragment BoardMembers on Board {\n    id\n    boardMembers {\n      ...BoardMemberShort\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoard($input: CreateBoardInput!) {\n    createBoard(input: $input) {\n      ...BoardRender\n    }\n  }\n"): (typeof documents)["\n  mutation createBoard($input: CreateBoardInput!) {\n    createBoard(input: $input) {\n      ...BoardRender\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoard($input: UpdateBoardInput!) {\n    updateBoard(input: $input) {\n      ...BoardRender\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoard($input: UpdateBoardInput!) {\n    updateBoard(input: $input) {\n      ...BoardRender\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId) {\n      ...BoardId\n    }\n  }\n"): (typeof documents)["\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId) {\n      ...BoardId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription boardCreated {\n    boardCreated {\n      ...BoardRender\n      ...BoardMembers\n    }\n  }\n"): (typeof documents)["\n  subscription boardCreated {\n    boardCreated {\n      ...BoardRender\n      ...BoardMembers\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription boardUpdated {\n    boardUpdated {\n      ...BoardRender\n      ...BoardMembers\n    }\n  }\n"): (typeof documents)["\n  subscription boardUpdated {\n    boardUpdated {\n      ...BoardRender\n      ...BoardMembers\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription boardDeleted {\n    boardDeleted {\n      ...BoardRender\n      ...BoardMembers\n    }\n  }\n"): (typeof documents)["\n  subscription boardDeleted {\n    boardDeleted {\n      ...BoardRender\n      ...BoardMembers\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CardCommentId on CardComment {\n    id\n  }\n\n  fragment CardCommentRender on CardComment {\n    id\n    text\n    createdAt\n    user {\n      ...UserShort\n    }\n  }\n\n  fragment CardCommentPaginatedRender on CardCommentPaginated {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      cursor\n      node {\n        ...CardCommentRender\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment CardCommentId on CardComment {\n    id\n  }\n\n  fragment CardCommentRender on CardComment {\n    id\n    text\n    createdAt\n    user {\n      ...UserShort\n    }\n  }\n\n  fragment CardCommentPaginatedRender on CardCommentPaginated {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      cursor\n      node {\n        ...CardCommentRender\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createCardComment($input: CreateCardCommentInput!) {\n    createCardComment(input: $input) {\n      ...CardCommentRender\n    }\n  }\n"): (typeof documents)["\n  mutation createCardComment($input: CreateCardCommentInput!) {\n    createCardComment(input: $input) {\n      ...CardCommentRender\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateCardComment($input: UpdateCardCommentInput!) {\n    updateCardComment(input: $input) {\n      ...CardCommentRender\n    }\n  }\n"): (typeof documents)["\n  mutation updateCardComment($input: UpdateCardCommentInput!) {\n    updateCardComment(input: $input) {\n      ...CardCommentRender\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteCardComment($boardId: ID!, $commentId: ID!) {\n    deleteCardComment(boardId: $boardId, commentId: $commentId) {\n      ...CardCommentId\n    }\n  }\n"): (typeof documents)["\n  mutation deleteCardComment($boardId: ID!, $commentId: ID!) {\n    deleteCardComment(boardId: $boardId, commentId: $commentId) {\n      ...CardCommentId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription cardCommentCreated($input: CardCommentSubscriptionInput!) {\n    commentCreated(input: $input) {\n      ...CardCommentRender\n      card {\n        ...CardId\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription cardCommentCreated($input: CardCommentSubscriptionInput!) {\n    commentCreated(input: $input) {\n      ...CardCommentRender\n      card {\n        ...CardId\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription cardCommentUpdated($input: CardCommentSubscriptionInput!) {\n    commentUpdated(input: $input) {\n      ...CardCommentRender\n    }\n  }\n"): (typeof documents)["\n  subscription cardCommentUpdated($input: CardCommentSubscriptionInput!) {\n    commentUpdated(input: $input) {\n      ...CardCommentRender\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription cardCommentDeleted($input: CardCommentSubscriptionInput!) {\n    commentDeleted(input: $input) {\n      ...CardCommentId\n    }\n  }\n"): (typeof documents)["\n  subscription cardCommentDeleted($input: CardCommentSubscriptionInput!) {\n    commentDeleted(input: $input) {\n      ...CardCommentId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PartialCardRender on PartialCard {\n    name\n    description\n    tags {\n      ...TagRender\n    }\n  }\n\n  fragment CardHistoryId on CardHistory {\n    id\n  }\n\n  fragment CardHistoryRender on CardHistory {\n    id\n    createdAt\n    author {\n      ...UserShort\n    }\n    payload\n  }\n\n  fragment CardHistoryPaginatedRender on CardHistoryPaginated {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      cursor\n      node {\n        ...CardHistoryRender\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment PartialCardRender on PartialCard {\n    name\n    description\n    tags {\n      ...TagRender\n    }\n  }\n\n  fragment CardHistoryId on CardHistory {\n    id\n  }\n\n  fragment CardHistoryRender on CardHistory {\n    id\n    createdAt\n    author {\n      ...UserShort\n    }\n    payload\n  }\n\n  fragment CardHistoryPaginatedRender on CardHistoryPaginated {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      cursor\n      node {\n        ...CardHistoryRender\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription cardHistoryCreated($input: CardHistorySubscriptionInput!) {\n    historyCreated(input: $input) {\n      ...CardHistoryRender\n      card {\n        ...CardId\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription cardHistoryCreated($input: CardHistorySubscriptionInput!) {\n    historyCreated(input: $input) {\n      ...CardHistoryRender\n      card {\n        ...CardId\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CardId on Card {\n    id\n  }\n\n  fragment CardSort on Card {\n    id\n    rank\n  }\n\n  fragment CardName on Card {\n    id\n    name\n  }\n\n  fragment CardRender on Card {\n    id\n    name\n    description\n  }\n"): (typeof documents)["\n  fragment CardId on Card {\n    id\n  }\n\n  fragment CardSort on Card {\n    id\n    rank\n  }\n\n  fragment CardName on Card {\n    id\n    name\n  }\n\n  fragment CardRender on Card {\n    id\n    name\n    description\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createCard($input: CreateCardInput!) {\n    createCard(input: $input) {\n      ...CardRender\n      ...CardSort\n      column {\n        ...ColumnId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createCard($input: CreateCardInput!) {\n    createCard(input: $input) {\n      ...CardRender\n      ...CardSort\n      column {\n        ...ColumnId\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateCard($input: UpdateCardInput!) {\n    updateCard(input: $input) {\n      ...CardRender\n      ...CardSort\n      column {\n        ...ColumnId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation updateCard($input: UpdateCardInput!) {\n    updateCard(input: $input) {\n      ...CardRender\n      ...CardSort\n      column {\n        ...ColumnId\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation moveCard($input: MoveCardInput!) {\n    moveCard(input: $input) {\n      card {\n        ...CardRender\n        ...CardSort\n        column {\n          id\n        }\n      }\n      sourceColumn {\n        ...ColumnId\n        cards {\n          ...CardId\n        }\n      }\n      targetColumn {\n        ...ColumnId\n        cards {\n          ...CardId\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation moveCard($input: MoveCardInput!) {\n    moveCard(input: $input) {\n      card {\n        ...CardRender\n        ...CardSort\n        column {\n          id\n        }\n      }\n      sourceColumn {\n        ...ColumnId\n        cards {\n          ...CardId\n        }\n      }\n      targetColumn {\n        ...ColumnId\n        cards {\n          ...CardId\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation attachTag($input: UpdateCardInput!) {\n    updateCard(input: $input) {\n      ...CardId\n      tags {\n        ...TagRender\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation attachTag($input: UpdateCardInput!) {\n    updateCard(input: $input) {\n      ...CardId\n      tags {\n        ...TagRender\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateCardOwner($input: UpdateCardOwnerInput!) {\n    updateCardOwner(input: $input) {\n      ...CardId\n      owner {\n        ...UserShort\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation updateCardOwner($input: UpdateCardOwnerInput!) {\n    updateCardOwner(input: $input) {\n      ...CardId\n      owner {\n        ...UserShort\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateCardAssignees($input: UpdateCardAssigneesInput!) {\n    updateCardAssignees(input: $input) {\n      ...CardId\n      assignees {\n        ...UserShort\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation updateCardAssignees($input: UpdateCardAssigneesInput!) {\n    updateCardAssignees(input: $input) {\n      ...CardId\n      assignees {\n        ...UserShort\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription cardCreated($input: CardSubscriptionInput!) {\n    cardCreated(input: $input) {\n      ...CardRender\n      ...CardSort\n      column {\n        ...ColumnId\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription cardCreated($input: CardSubscriptionInput!) {\n    cardCreated(input: $input) {\n      ...CardRender\n      ...CardSort\n      column {\n        ...ColumnId\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription cardUpdated($input: CardSubscriptionInput!) {\n    cardUpdated(input: $input) {\n      ...CardRender\n      ...CardSort\n      column {\n        ...ColumnId\n      }\n      owner {\n        ...UserShort\n      }\n      assignees {\n        ...UserShort\n      }\n      tags {\n        ...TagId\n      }\n      board {\n        ...BoardId\n        tags {\n          ...TagRender\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription cardUpdated($input: CardSubscriptionInput!) {\n    cardUpdated(input: $input) {\n      ...CardRender\n      ...CardSort\n      column {\n        ...ColumnId\n      }\n      owner {\n        ...UserShort\n      }\n      assignees {\n        ...UserShort\n      }\n      tags {\n        ...TagId\n      }\n      board {\n        ...BoardId\n        tags {\n          ...TagRender\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription cardMoved($input: CardSubscriptionInput!) {\n    cardMoved(input: $input) {\n      card {\n        ...CardRender\n        ...CardSort\n        column {\n          ...ColumnId\n        }\n      }\n      sourceColumn {\n        ...ColumnId\n      }\n      targetColumn {\n        ...ColumnId\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription cardMoved($input: CardSubscriptionInput!) {\n    cardMoved(input: $input) {\n      card {\n        ...CardRender\n        ...CardSort\n        column {\n          ...ColumnId\n        }\n      }\n      sourceColumn {\n        ...ColumnId\n      }\n      targetColumn {\n        ...ColumnId\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ColumnId on Column {\n    id\n  }\n\n  fragment ColumnSort on Column {\n    id\n    rank\n  }\n\n  fragment ColumnRender on Column {\n    id\n    name\n    color\n    maxCardsCount\n  }\n"): (typeof documents)["\n  fragment ColumnId on Column {\n    id\n  }\n\n  fragment ColumnSort on Column {\n    id\n    rank\n  }\n\n  fragment ColumnRender on Column {\n    id\n    name\n    color\n    maxCardsCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createColumn($input: CreateColumnInput!) {\n    createColumn(input: $input) {\n      ...ColumnRender\n      ...ColumnSort\n      board {\n        ...BoardId\n        columns {\n          ...ColumnId\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createColumn($input: CreateColumnInput!) {\n    createColumn(input: $input) {\n      ...ColumnRender\n      ...ColumnSort\n      board {\n        ...BoardId\n        columns {\n          ...ColumnId\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateColumn($input: UpdateColumnInput!) {\n    updateColumn(input: $input) {\n      ...ColumnRender\n    }\n  }\n"): (typeof documents)["\n  mutation updateColumn($input: UpdateColumnInput!) {\n    updateColumn(input: $input) {\n      ...ColumnRender\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation moveColumn($input: MoveColumnInput!) {\n    moveColumn(input: $input) {\n      ...ColumnRender\n      ...ColumnSort\n    }\n  }\n"): (typeof documents)["\n  mutation moveColumn($input: MoveColumnInput!) {\n    moveColumn(input: $input) {\n      ...ColumnRender\n      ...ColumnSort\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteColumn($boardId: ID!, $id: ID!) {\n    deleteColumn(boardId: $boardId, id: $id) {\n      ...ColumnId\n    }\n  }\n"): (typeof documents)["\n  mutation deleteColumn($boardId: ID!, $id: ID!) {\n    deleteColumn(boardId: $boardId, id: $id) {\n      ...ColumnId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription columnCreated($input: ColumnSubscriptionInput!) {\n    columnCreated(input: $input) {\n      ...ColumnRender\n      ...ColumnSort\n      cards {\n        ...CardRender\n        ...CardSort\n        column {\n          ...ColumnId\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription columnCreated($input: ColumnSubscriptionInput!) {\n    columnCreated(input: $input) {\n      ...ColumnRender\n      ...ColumnSort\n      cards {\n        ...CardRender\n        ...CardSort\n        column {\n          ...ColumnId\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription columnUpdated($input: ColumnSubscriptionInput!) {\n    columnUpdated(input: $input) {\n      ...ColumnRender\n      ...ColumnSort\n      cards {\n        ...CardRender\n        ...CardSort\n        column {\n          ...ColumnId\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription columnUpdated($input: ColumnSubscriptionInput!) {\n    columnUpdated(input: $input) {\n      ...ColumnRender\n      ...ColumnSort\n      cards {\n        ...CardRender\n        ...CardSort\n        column {\n          ...ColumnId\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription columnDeleted($input: ColumnSubscriptionInput!) {\n    columnDeleted(input: $input) {\n      ...ColumnRender\n      ...ColumnSort\n      cards {\n        ...CardRender\n        ...CardSort\n        column {\n          ...ColumnId\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription columnDeleted($input: ColumnSubscriptionInput!) {\n    columnDeleted(input: $input) {\n      ...ColumnRender\n      ...ColumnSort\n      cards {\n        ...CardRender\n        ...CardSort\n        column {\n          ...ColumnId\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment NotificationRender on Notification {\n    id\n    type\n    createdAt\n    isRead\n\n    actor {\n      ...UserShort\n    }\n\n    ... on CardOwnerAddedNotification {\n      card {\n        ...CardName\n      }\n    }\n\n    ... on CardOwnerRemovedNotification {\n      card {\n        ...CardName\n      }\n    }\n\n    ... on CardAssigneesAddedNotification {\n      card {\n        ...CardName\n      }\n    }\n\n    ... on CardAssigneesRemovedNotification {\n      card {\n        ...CardName\n      }\n    }\n  }\n\n  fragment NotificationPaginatedRender on NotificationPaginated {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      cursor\n      node {\n        ...NotificationRender\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment NotificationRender on Notification {\n    id\n    type\n    createdAt\n    isRead\n\n    actor {\n      ...UserShort\n    }\n\n    ... on CardOwnerAddedNotification {\n      card {\n        ...CardName\n      }\n    }\n\n    ... on CardOwnerRemovedNotification {\n      card {\n        ...CardName\n      }\n    }\n\n    ... on CardAssigneesAddedNotification {\n      card {\n        ...CardName\n      }\n    }\n\n    ... on CardAssigneesRemovedNotification {\n      card {\n        ...CardName\n      }\n    }\n  }\n\n  fragment NotificationPaginatedRender on NotificationPaginated {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      cursor\n      node {\n        ...NotificationRender\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation readNotification($boardId: ID!, $id: ID!) {\n    readNotification(boardId: $boardId, id: $id) {\n      ...NotificationRender\n    }\n  }\n"): (typeof documents)["\n  mutation readNotification($boardId: ID!, $id: ID!) {\n    readNotification(boardId: $boardId, id: $id) {\n      ...NotificationRender\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription notificationCreated($input: NotificationSubscriptionInput!) {\n    notificationCreated(input: $input) {\n      ...NotificationRender\n    }\n  }\n"): (typeof documents)["\n  subscription notificationCreated($input: NotificationSubscriptionInput!) {\n    notificationCreated(input: $input) {\n      ...NotificationRender\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription notificationUpdated($input: NotificationSubscriptionInput!) {\n    notificationUpdated(input: $input) {\n      ...NotificationRender\n    }\n  }\n"): (typeof documents)["\n  subscription notificationUpdated($input: NotificationSubscriptionInput!) {\n    notificationUpdated(input: $input) {\n      ...NotificationRender\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription notificationUnreadCountUpdated($input: UnreadNotificationsCountUpdatedInput!) {\n    notificationUnreadCountUpdated(input: $input)\n  }\n"): (typeof documents)["\n  subscription notificationUnreadCountUpdated($input: UnreadNotificationsCountUpdatedInput!) {\n    notificationUnreadCountUpdated(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation logout {\n    logout\n  }\n"): (typeof documents)["\n  mutation logout {\n    logout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation refresh {\n    refresh {\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation refresh {\n    refresh {\n      accessToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      ...UserShort\n    }\n  }\n"): (typeof documents)["\n  mutation createUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      ...UserShort\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query whoAmI {\n    whoAmI {\n      id\n      firstName\n      lastName\n      email\n      boardMemberships {\n        id\n        role\n        board {\n          ...BoardId\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query whoAmI {\n    whoAmI {\n      id\n      firstName\n      lastName\n      email\n      boardMemberships {\n        id\n        role\n        board {\n          ...BoardId\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TagId on Tag {\n    id\n  }\n\n  fragment TagRender on Tag {\n    id\n    name\n    color\n  }\n"): (typeof documents)["\n  fragment TagId on Tag {\n    id\n  }\n\n  fragment TagRender on Tag {\n    id\n    name\n    color\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createTag($input: CreateTagInput!) {\n    createTag(input: $input) {\n      ...TagRender\n      cards {\n        ...CardId\n      }\n      board {\n        ...BoardId\n        tags {\n          ...TagRender\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createTag($input: CreateTagInput!) {\n    createTag(input: $input) {\n      ...TagRender\n      cards {\n        ...CardId\n      }\n      board {\n        ...BoardId\n        tags {\n          ...TagRender\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateTag($input: UpdateTagInput!) {\n    updateTag(input: $input) {\n      ...TagRender\n    }\n  }\n"): (typeof documents)["\n  mutation updateTag($input: UpdateTagInput!) {\n    updateTag(input: $input) {\n      ...TagRender\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteTag($boardId: ID!, $id: ID!) {\n    deleteTag(boardId: $boardId, id: $id) {\n      ...TagId\n    }\n  }\n"): (typeof documents)["\n  mutation deleteTag($boardId: ID!, $id: ID!) {\n    deleteTag(boardId: $boardId, id: $id) {\n      ...TagId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription tagCreated($input: TagSubscriptionInput!) {\n    tagCreated(input: $input) {\n      ...TagRender\n      cards {\n        ...CardId\n      }\n      board {\n        ...BoardId\n        tags {\n          ...TagRender\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription tagCreated($input: TagSubscriptionInput!) {\n    tagCreated(input: $input) {\n      ...TagRender\n      cards {\n        ...CardId\n      }\n      board {\n        ...BoardId\n        tags {\n          ...TagRender\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription tagUpdated($input: TagSubscriptionInput!) {\n    tagUpdated(input: $input) {\n      ...TagRender\n    }\n  }\n"): (typeof documents)["\n  subscription tagUpdated($input: TagSubscriptionInput!) {\n    tagUpdated(input: $input) {\n      ...TagRender\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription tagDeleted($input: TagSubscriptionInput!) {\n    tagDeleted(input: $input) {\n      ...TagId\n    }\n  }\n"): (typeof documents)["\n  subscription tagDeleted($input: TagSubscriptionInput!) {\n    tagDeleted(input: $input) {\n      ...TagId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserId on User {\n    id\n  }\n\n  fragment UserShort on User {\n    id\n    firstName\n    lastName\n    email\n  }\n"): (typeof documents)["\n  fragment UserId on User {\n    id\n  }\n\n  fragment UserShort on User {\n    id\n    firstName\n    lastName\n    email\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query usersList {\n    users {\n      ...UserShort\n    }\n  }\n"): (typeof documents)["\n  query usersList {\n    users {\n      ...UserShort\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query boardMembersSelectData($boardId: ID!) {\n    board(boardId: $boardId) {\n      ...BoardRender\n      ...BoardMembers\n    }\n  }\n"): (typeof documents)["\n  query boardMembersSelectData($boardId: ID!) {\n    board(boardId: $boardId) {\n      ...BoardRender\n      ...BoardMembers\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getNotifications($input: GetNotificationsInput!) {\n    notifications(input: $input) {\n      ...NotificationPaginatedRender\n    }\n  }\n"): (typeof documents)["\n  query getNotifications($input: GetNotificationsInput!) {\n    notifications(input: $input) {\n      ...NotificationPaginatedRender\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query countUnreadNotifications($input: CountNotificationsInput!) {\n    countUnreadNotifications(input: $input)\n  }\n"): (typeof documents)["\n  query countUnreadNotifications($input: CountNotificationsInput!) {\n    countUnreadNotifications(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query allBoards {\n    boards {\n      ...BoardRender\n    }\n  }\n"): (typeof documents)["\n  query allBoards {\n    boards {\n      ...BoardRender\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query searchCards($input: SearchCardsInput!) {\n    searchCards(input: $input) {\n      ...CardRender\n    }\n  }\n"): (typeof documents)["\n  query searchCards($input: SearchCardsInput!) {\n    searchCards(input: $input) {\n      ...CardRender\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query boardsGridData {\n    boards {\n      ...BoardRender\n      ...BoardMembers\n    }\n  }\n"): (typeof documents)["\n  query boardsGridData {\n    boards {\n      ...BoardRender\n      ...BoardMembers\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query cardComments($input: CardByIdInput!, $pagination: PaginationArgs!) {\n    cardById(input: $input) {\n      id\n      comments(input: $pagination) {\n        ...CardCommentPaginatedRender\n      }\n    }\n  }\n"): (typeof documents)["\n  query cardComments($input: CardByIdInput!, $pagination: PaginationArgs!) {\n    cardById(input: $input) {\n      id\n      comments(input: $pagination) {\n        ...CardCommentPaginatedRender\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query cardHistory($input: CardByIdInput!, $pagination: PaginationArgs!) {\n    cardById(input: $input) {\n      id\n      history(input: $pagination) {\n        ...CardHistoryPaginatedRender\n      }\n    }\n  }\n"): (typeof documents)["\n  query cardHistory($input: CardByIdInput!, $pagination: PaginationArgs!) {\n    cardById(input: $input) {\n      id\n      history(input: $pagination) {\n        ...CardHistoryPaginatedRender\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getCardById($input: CardByIdInput!) {\n    cardById(input: $input) {\n      ...CardRender\n      owner {\n        ...UserShort\n      }\n      assignees {\n        ...UserShort\n      }\n      tags {\n        ...TagId\n      }\n      board {\n        ...BoardId\n        tags {\n          ...TagRender\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getCardById($input: CardByIdInput!) {\n    cardById(input: $input) {\n      ...CardRender\n      owner {\n        ...UserShort\n      }\n      assignees {\n        ...UserShort\n      }\n      tags {\n        ...TagId\n      }\n      board {\n        ...BoardId\n        tags {\n          ...TagRender\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getBoardData($boardId: ID!) {\n    board(boardId: $boardId) {\n      ...BoardRender\n      columns {\n        ...ColumnRender\n        ...ColumnSort\n        cards {\n          ...CardRender\n          ...CardSort\n          column {\n            ...ColumnId\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getBoardData($boardId: ID!) {\n    board(boardId: $boardId) {\n      ...BoardRender\n      columns {\n        ...ColumnRender\n        ...ColumnSort\n        cards {\n          ...CardRender\n          ...CardSort\n          column {\n            ...ColumnId\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;