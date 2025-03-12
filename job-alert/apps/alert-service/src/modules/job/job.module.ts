import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { JobSubscriptionService } from '../job_subscription/job_subscription.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from './models/job.schema';
import { JobSubscriptionModule } from '../job_subscription/job_subscription.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
    JobSubscriptionModule,
  ],
  controllers: [JobController],
  providers: [JobService],
  exports: [JobService],
})
export class JobModule {}
