import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { KafkaController } from './kafka.controller';
import { JobModule } from '../job/job.module';

@Module({
  imports: [JobModule],
  controllers: [KafkaController],
  providers: [KafkaService],
})
export class KafkaModule {}
