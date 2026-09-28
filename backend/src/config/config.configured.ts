import { ConfigModule } from '@nestjs/config';

export const ConfigConfiguredModule = ConfigModule.forRoot({
  envFilePath: '.env',
  isGlobal: true,
});
