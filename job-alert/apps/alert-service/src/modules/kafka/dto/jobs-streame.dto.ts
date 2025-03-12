import {
  ExperienceLevels,
  JobTypes,
} from '../../job_subscription/dto/job-types';

export class JobsStreamDto {
  title: string;
  company_id: string;
  location: string;
  url: string;
  deadline: string | null;
  category: string;
  job_type: JobTypes;
  experience_level: ExperienceLevels;
}
