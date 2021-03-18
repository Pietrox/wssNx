import { ProgressDto, TaskDto } from '@testwork/dto';

export class Task {

  static taskCreate(input: ProgressDto): TaskDto {

    return Object.assign({
      data: {
        message: input.message
      },
      opts: {
        jobId: input.jobId,
        priority: 3,
        delay: 1000,
        attempts: 100,
        timeout: 30000,
        removeOnComplete: true,
        removeOnFail: false,
        backoff: 10000,
        stackTrace: 20
      }
    });
  }
}
