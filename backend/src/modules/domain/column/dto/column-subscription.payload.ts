import { ByBoardPayload } from '@/common/graphql/filters/byBoard';

import { Column } from '../entities/column.entity';

export class ColumnSubscriptionPayload extends ByBoardPayload {
  column!: Column;
}
