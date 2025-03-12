import { Module } from '@nestjs/common';
import { JobAlertService } from './job_alert.service';
import { JobAlertController } from './job_alert.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobAlert, JobAlertSchema } from './models/job_alert.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobAlert.name, schema: JobAlertSchema },
    ]),
  ],
  controllers: [JobAlertController],
  providers: [JobAlertService],
  exports: [JobAlertService],
})
export class JobAlertModule {}
