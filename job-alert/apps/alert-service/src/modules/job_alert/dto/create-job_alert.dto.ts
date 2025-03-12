import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateJobAlertDto {
  @IsString()
  user: string;

  @IsString()
  job: string;

  @IsString()
  img: string;

  @IsBoolean()
  @IsOptional()
  isRead?: boolean;
}
