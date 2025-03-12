import { PartialType } from '@nestjs/mapped-types';
import { CreateKafkaDto } from './create-kafka.dto';

export class UpdateKafkaDto extends PartialType(CreateKafkaDto) {}
