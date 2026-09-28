export class ByBoardPayload {
  boardId!: string;
}

export const byBoard = (
  payload: ByBoardPayload,
  variables: { input: ByBoardPayload },
): boolean => {
  return payload.boardId === variables.input.boardId;
};

export class ByCardPayload {
  cardId!: string;
}
