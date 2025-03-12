import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobAlertService } from './job_alert.service';
import { CreateJobAlertDto } from './dto/create-job_alert.dto';
import { UpdateJobAlertDto } from './dto/update-job_alert.dto';

@Controller('job-alert')
export class JobAlertController {
  constructor(private readonly jobAlertService: JobAlertService) {}

  @Post()
  create(@Body() createJobAlertDto: CreateJobAlertDto) {
    return this.jobAlertService.create(createJobAlertDto);
  }

  @Get()
  findAll() {
    return this.jobAlertService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobAlertService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobAlertDto: UpdateJobAlertDto) {
    return this.jobAlertService.update(+id, updateJobAlertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobAlertService.remove(+id);
  }
}
