import { Module } from '@nestjs/common';
import { FirstClientService } from './first-client.service';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
        enableReadyCheck: false
      }
    }),
    BullModule.registerQueue({
      name: process.env.PROGRESS_QUEUE,
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
        enableReadyCheck: false
      }
    }),
    BullModule.registerQueue({
      name: process.env.PROGRESS_REPLY,
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
        enableReadyCheck: false
      }
    })

  ],
  providers: [FirstClientService]
})
export class AppModule {
}
