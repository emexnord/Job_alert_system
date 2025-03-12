import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobsStreamDto } from '../kafka/dto/jobs-streame.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './models/job.schema';
import { JobSubscriptionService } from '../job_subscription/job_subscription.service';

@Injectable()
export class JobService {
  constructor(
    @InjectModel(Job.name) private readonly jobModel: Model<JobDocument>,
    private readonly jobSubscriptionService: JobSubscriptionService,
  ) {}

  create(createJobDto: CreateJobDto) {
    return this.jobModel.create(createJobDto);
  }

  async update(id: string, updateJobDto: UpdateJobDto) {
    return this.jobModel.findByIdAndUpdate(id, updateJobDto, { new: true });
  }

  async processJobs(jobs: JobsStreamDto[]) {
    for (let job of jobs) {
      try {
        // first store the job in Db
        const existing_job = await this.findByUrl(job.url);
        if (existing_job && !existing_job.categories.includes(job.category)) {
          existing_job.categories.push(job.category);
          await existing_job.save();

          // then notify subscribed users about the new jobs category
          await this.jobSubscriptionService.notifySubscribers(
            existing_job,
            job.category,
          );
        } else {
          const new_job = await this.create({
            title: job.title,
            company: job.company_id,
            location: job.location,
            url: job.url,
            deadline: new Date(job.deadline),
            categories: job.category ? [job.category] : [],
          });
          // then notify subscribed users about the new job
          await this.jobSubscriptionService.notifySubscribers(
            new_job,
            job.category,
          );
        }
      } catch (error) {
        throw new InternalServerErrorException(
          `Error processing job ${job.url}`,
        );
      }
    }
  }

  async findByUrl(url: string) {
    return this.jobModel.findOne({ url });
  }
}
