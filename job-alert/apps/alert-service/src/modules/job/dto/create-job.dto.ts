import {
  IsString,
  IsUrl,
  IsArray,
  IsOptional,
  IsEnum,
  IsDateString,
} from 'class-validator';
import {
  JobTypes,
  ExperienceLevels,
} from '../../job_subscription/dto/job-types';

export class CreateJobDto {
  @IsString()
  title: string;

  @IsString()
  company: string;

  @IsUrl()
  url: string;

  @IsArray()
  @IsString({ each: true })
  categories: string[];

  @IsOptional()
  @IsEnum(JobTypes)
  jobType?: JobTypes;

  @IsOptional()
  @IsEnum(ExperienceLevels)
  experienceLevel?: string;

  @IsString()
  location: string;

  @IsDateString()
  deadline: Date;
}
