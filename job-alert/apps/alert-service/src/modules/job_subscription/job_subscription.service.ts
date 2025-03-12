import { Injectable } from '@nestjs/common';
import { CreateJobSubscriptionDto } from './dto/create-job_subscription.dto';
import { UpdateJobSubscriptionDto } from './dto/update-job_subscription.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  JobSubscription,
  JobSubscriptionDocument,
} from './models/job_subscription.schema';
import { Model } from 'mongoose';
import { Job } from '../job/models/job.schema';
import { JobAlertService } from '../job_alert/job_alert.service';
import { NotificationService } from '../notification/notification.service';
import { NotificationEvents } from '../notification/dto/notification-event.dto';

@Injectable()
export class JobSubscriptionService {
  constructor(
    @InjectModel(JobSubscription.name)
    private readonly jobSubscriptionModel: Model<JobSubscriptionDocument>,
    private readonly jobAlertService: JobAlertService,
    private readonly notificationService: NotificationService,
  ) {}

  async notifySubscribers(job: Job, category: string) {
    console.log('JobSubscriptionService -> notifySubscribers', job);

    // get all subscribers
    const subscribers = await this.find({
      company_id: job.company_id,
      category: category,
      location: job.location,
      jobType: job.jobType,
      experienceLevel: job.experienceLevel,
    });

    if (subscribers.length > 0) {
      for (let subscriber of subscribers) {
        // create job alert for the subscriber
        await this.jobAlertService.create({
          user: subscriber.user,
          job: job._id,
          img: '',
        });

        // send notification to the subscriber
        await this.notificationService.createNotification({
          title: 'New Job',
          recipient: subscriber.user,
          content: `New job in ${category} category`,
          img: '',
          url: `/jobs/${job._id}`,
          type: NotificationEvents.JOB_ALERT,
        });
      }
    }
  }

  create(createJobSubscriptionDto: CreateJobSubscriptionDto) {
    return 'This action adds a new jobSubscription';
  }

  findAll() {
    return `This action returns all jobSubscription`;
  }

  find(filter: Partial<JobSubscription>) {
    return this.jobSubscriptionModel.find(filter);
  }
}
