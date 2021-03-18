export class TaskDto {
  data: TaskDataDto;
  opts: TaskOptsDto;
}

export class TaskDataDto {
  something: string;
}

export class TaskOptsDto {
  jobId: string;
  priority: number;
  delay: number;
  attempts: number;
  timeout: number;
  removeOnComplete: boolean;
  removeOnFail: boolean;
  backoff: number;
  stackTrace: number;
}

