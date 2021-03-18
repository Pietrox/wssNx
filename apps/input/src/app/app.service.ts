import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Interval } from '@nestjs/schedule/dist/decorators/interval.decorator';
import { v4 as uuid } from 'uuid';
import { AppGateway } from './app.gateway';
import { Task } from '@testwork/statics';

@Injectable()
export class AppService {

  constructor(
    @InjectQueue(process.env.PROGRESS_QUEUE) private readonly queue: Queue,
    private gateway: AppGateway
  ) {
  }


  @Interval(Number(process.env.PROGRESS_INTERVAL))
  async getData() {
    const jobId = uuid();
    try {

      this.gateway.wss.emit({
        processId: jobId,
        status: 'Started'
      });
      const task = await Task.taskCreate({
        message: 'Start',
        jobId: jobId
      });
      await this.queue.add(process.env.PROGRESS_TASK_TEST, task);

    } catch (error) {
      console.error(error);
    }
  }


}
