export class CardLinkClickEvent extends CustomEvent<{ cardId: string }> {
  public static EVENT_TYPE = 'card_link_click';

  public constructor(cardId: string) {
    super(CardLinkClickEvent.EVENT_TYPE, { detail: { cardId } });
  }
}
