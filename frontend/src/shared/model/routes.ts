export const ROUTES = {
  ROOT_PATTERN: `/`,
  BOARDS_PATTERN: `/boards`,
  BOARD_PATTERN: `/board/:boardId`,
  BOARD_CARD_PATTERN: `/board/:boardId/card/:cardId`,
  LOGIN_PATTERN: `/login`,
  BOARD: (id: string) => `/board/${id}`,
  BOARD_CARD: (boardId: string, cardId: string) => `/board/${boardId}/card/${cardId}`,
} as const;
