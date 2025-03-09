import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class KafkaController {
  @EventPattern('job-alert')
  async handleJobAlert(@Payload() message: any) {
    console.log('Received job alert:', message);
    // Add your business logic here
  }
}
