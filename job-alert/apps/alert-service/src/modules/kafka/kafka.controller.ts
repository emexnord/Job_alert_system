import { EventPattern, Payload } from '@nestjs/microservices';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { CreateKafkaDto } from './dto/create-kafka.dto';
import { UpdateKafkaDto } from './dto/update-kafka.dto';

@Controller('')
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) {}

  @EventPattern('kafka-job-stream')
  async handleJobAlert(@Payload() message: any) {
    return this.kafkaService.handleJobAlert(message);
  }

  @Post()
  create(@Body() createKafkaDto: CreateKafkaDto) {
    return this.kafkaService.create(createKafkaDto);
  }

  @Get()
  findAll() {
    return this.kafkaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kafkaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKafkaDto: UpdateKafkaDto) {
    return this.kafkaService.update(+id, updateKafkaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kafkaService.remove(+id);
  }
}
