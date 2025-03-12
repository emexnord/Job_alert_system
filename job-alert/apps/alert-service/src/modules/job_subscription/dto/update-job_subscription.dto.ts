import { PartialType } from '@nestjs/mapped-types';
import { CreateJobSubscriptionDto } from './create-job_subscription.dto';

export class UpdateJobSubscriptionDto extends PartialType(CreateJobSubscriptionDto) {}
