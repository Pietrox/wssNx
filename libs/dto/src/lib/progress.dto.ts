import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ProgressDto {
  @IsNotEmpty()
  @IsString()
  message: string;
  @IsNotEmpty()
  @IsUUID()
  jobId: string;
}
