import { EventEmitterModule } from '@nestjs/event-emitter';

export const EventEmitterConfiguredModule = EventEmitterModule.forRoot({
  global: true,
});
