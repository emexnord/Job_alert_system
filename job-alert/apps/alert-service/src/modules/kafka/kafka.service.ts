import { Injectable } from '@nestjs/common';
import { CreateKafkaDto } from './dto/create-kafka.dto';
import { UpdateKafkaDto } from './dto/update-kafka.dto';
import { JobsStreamDto } from './dto/jobs-streame.dto';
import { JobService } from '../job/job.service';

@Injectable()
export class KafkaService {
  constructor(private readonly jobService: JobService) {}

  handleJobAlert(jobs: JobsStreamDto[]) {
    return this.jobService.processJobs(jobs);
  }

  create(createKafkaDto: CreateKafkaDto) {
    return 'This action adds a new kafka';
  }

  findAll() {
    return `This action returns all kafka`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kafka`;
  }

  update(id: number, updateKafkaDto: UpdateKafkaDto) {
    return `This action updates a #${id} kafka`;
  }

  remove(id: number) {
    return `This action removes a #${id} kafka`;
  }
}
