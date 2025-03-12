import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from '../../user/models/user.schema';
import { ExperienceLevels, JobTypes } from '../dto/job-types';
export type JobSubscriptionDocument = JobSubscription & Document;

@Schema({ timestamps: true })
export class JobSubscription {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: string;

  @Prop({ type: String })
  company_id: string;

  @Prop({ type: String })
  category: string;

  @Prop({ type: String })
  location: string;

  @Prop({ type: String, enum: JobTypes })
  jobType: JobTypes;

  @Prop({ type: String, enum: ExperienceLevels })
  experienceLevel: ExperienceLevels;
}

export const JobSubscriptionSchema =
  SchemaFactory.createForClass(JobSubscription);
