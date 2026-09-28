import { ByBoardPayload } from '@/common/graphql/filters/byBoard';

import { Tag } from '../entities/tag.entity';

export class TagSubscriptionPayload extends ByBoardPayload {
  tag!: Tag;
}
