import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { ScheduleModule } from '@nestjs/schedule';
import { AppGateway } from './app.gateway';
import { AppConsumer } from './app.consumer';


@Module({
  imports: [
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD
      }
    }),
    BullModule.registerQueue({
      name: process.env.PROGRESS_QUEUE,
      redis: {
        host: process.env.HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD
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
  providers: [AppGateway, AppService, AppConsumer]
})
export class AppModule {
}
