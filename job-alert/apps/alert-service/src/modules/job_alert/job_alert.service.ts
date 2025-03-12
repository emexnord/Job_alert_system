import { Injectable } from '@nestjs/common';
import { CreateJobAlertDto } from './dto/create-job_alert.dto';
import { UpdateJobAlertDto } from './dto/update-job_alert.dto';
import { JobAlert } from './models/job_alert.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobAlertService {
  constructor(
    @InjectModel(JobAlert.name)
    private readonly jobAlertModel: Model<JobAlert>,
  ) {}

  create(createJobAlertDto: CreateJobAlertDto) {
    return this.jobAlertModel.create(createJobAlertDto);
  }

  findAll() {
    return `This action returns all jobAlert`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobAlert`;
  }

  update(id: number, updateJobAlertDto: UpdateJobAlertDto) {
    return `This action updates a #${id} jobAlert`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobAlert`;
  }
}
