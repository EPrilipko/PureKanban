import { MikroOrmModule } from '@mikro-orm/nestjs';

import dbConfig from '@/db/mikro-orm.config';

export const MikroORMConfiguredModule = MikroOrmModule.forRoot(dbConfig);
