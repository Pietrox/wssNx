import { Injectable } from '@nestjs/common';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { range } from 'rxjs';
import { Task } from '@testwork/statics';

@Injectable()
@Processor(process.env.PROGRESS_QUEUE)
export class FirstClientService {
  constructor(
    @InjectQueue('reply') private readonly queue: Queue
  ) {
  }

  private static taskData(job: Job) {
    return {
      message: job.data.message,
      jobId: job.data.jobId
    };
  }

  @Process('test')
  private async processTask(job: Job) {
    try {

      job.data.data.message = 'Disconnecting email account';
      await job.progress(13);
      await this.addTask(job);

      job.data.data.message = 'Deleting User and his privileges';
      await job.progress(range(14 - 40));
      await this.addTask(job);

      job.data.data.message = 'Deleting Assets';
      await job.progress(range(41 - 60));
      await this.addTask(job);

      job.data.data.message = 'Cleaning the garbage';
      await job.progress(range(61 - 90));
      await this.addTask(job);

      job.data.data.message = 'Finished updating workspace';
      await job.progress(100);
      await this.addTask(job);

    } catch (error) {
      console.error(error);
    }
  }

  private addTask(job) {
    const object = Task.taskCreate({
      message: job.data.data.message,
      jobId: job.data.opts.jobId
    });
    return this.queue.add('reply', object);
  }
}
