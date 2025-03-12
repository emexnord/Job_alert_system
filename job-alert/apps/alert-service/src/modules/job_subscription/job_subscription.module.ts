import { Module } from '@nestjs/common';
import { JobSubscriptionService } from './job_subscription.service';
import { JobSubscriptionController } from './job_subscription.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobSubscription,
  JobSubscriptionSchema,
} from './models/job_subscription.schema';
import { JobAlertModule } from '../job_alert/job_alert.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobSubscription.name, schema: JobSubscriptionSchema },
    ]),
    JobAlertModule,
    NotificationModule,
  ],
  controllers: [JobSubscriptionController],
  providers: [JobSubscriptionService],
  exports: [JobSubscriptionService],
})
export class JobSubscriptionModule {}
