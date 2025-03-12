import {
  IsString,
  IsOptional,
  IsMongoId,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { NotificationEvents } from './notification-event.dto';

export class CreateNotificationDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  recipient: string;

  @IsString()
  @IsOptional()
  img?: string;

  @IsEnum(NotificationEvents)
  type: NotificationEvents;

  @IsString()
  @IsOptional()
  url?: string;

  @IsBoolean()
  @IsOptional()
  isRead?: boolean;
}
