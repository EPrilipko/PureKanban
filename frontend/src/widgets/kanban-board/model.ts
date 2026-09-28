import type { GetBoardDataQuery } from 'generated/graphql';

export type Board = GetBoardDataQuery['board'];
export type Column = Board['columns'][number];
export type Card = Column['cards'][number];
