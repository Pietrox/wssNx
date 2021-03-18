import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { AppGateway } from './app.gateway';

@Injectable()
@Processor('reply')
export class AppConsumer {
  constructor(
    private gateway: AppGateway
  ) {
  }

  @Process('reply')
  private processTask(job: Job) {
    console.log(job);
    this.gateway.wss.emit({
      processId: job.data.opts.jobId,
      message: job.data.data.message
    });
  }
}
