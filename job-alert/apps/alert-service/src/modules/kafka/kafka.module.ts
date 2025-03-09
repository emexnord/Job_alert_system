import { Module, NestModule } from '@nestjs/common';
import { KafkaController } from './kafka.controller';

@Module({
  imports: [],
  providers: [KafkaController],
  exports: [],
})
export class kafkaModule implements NestModule {
  configure() {}
}
