import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JobSubscriptionService } from './job_subscription.service';
import { CreateJobSubscriptionDto } from './dto/create-job_subscription.dto';
import { UpdateJobSubscriptionDto } from './dto/update-job_subscription.dto';

@Controller('job-subscription')
export class JobSubscriptionController {
  constructor(
    private readonly jobSubscriptionService: JobSubscriptionService,
  ) {}

  @Post()
  create(@Body() createJobSubscriptionDto: CreateJobSubscriptionDto) {
    return this.jobSubscriptionService.create(createJobSubscriptionDto);
  }

  @Get()
  findAll() {
    return this.jobSubscriptionService.findAll();
  }
}
