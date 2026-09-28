import { InputType } from '@nestjs/graphql';

import { BaseInput } from '@/common/dto/base-input.input';

@InputType()
export class TagSubscriptionInput extends BaseInput {}
