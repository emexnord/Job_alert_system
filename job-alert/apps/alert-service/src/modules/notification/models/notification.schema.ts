import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../user/models/user.schema';
import { NotificationEvents } from '../dto/notification-event.dto';

@Schema({ timestamps: true })
export class Notification extends Document {
  @Prop({ type: Types.ObjectId })
  _id: string;

  @Prop({ required: true, type: String })
  title: string;

  @Prop({ type: String })
  content: string;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  recipient: Types.ObjectId;

  @Prop({ type: String })
  img: string;

  @Prop({ required: true, enum: NotificationEvents })
  type: string;

  @Prop({ type: String })
  url: string;

  @Prop({ type: Boolean, default: false })
  isRead: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
