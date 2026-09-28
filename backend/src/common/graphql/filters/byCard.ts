export class ByCardPayload {
  cardId!: string;
}

export const byCard = (
  payload: ByCardPayload,
  variables: { input: ByCardPayload },
): boolean => {
  return payload.cardId === variables.input.cardId;
};
