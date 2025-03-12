import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../user/models/user.schema';
import { Job } from '../../job/models/job.schema';

@Schema({ timestamps: true })
export class JobAlert extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: string;

  @Prop({ type: Types.ObjectId, ref: Job.name, required: true })
  job: string;

  @Prop({ type: String })
  img: string;

  @Prop({ type: Boolean, default: false })
  isRead: boolean;
}

export const JobAlertSchema = SchemaFactory.createForClass(JobAlert);
