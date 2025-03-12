import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import {
  ExperienceLevels,
  JobTypes,
} from '../../job_subscription/dto/job-types';
export type JobDocument = Job & Document;

@Schema({ timestamps: true })
export class Job {
  @Prop({ type: Types.ObjectId })
  _id: string;

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  company_id: string;

  @Prop({ type: String, unique: true })
  url: string;

  @Prop({ type: [String], default: [] })
  categories: string[];

  @Prop({ type: String, enum: JobTypes })
  jobType: JobTypes;

  @Prop({ type: String, enum: ExperienceLevels })
  experienceLevel: ExperienceLevels;

  @Prop({ type: String })
  location: string;

  @Prop({ type: Date })
  deadline: Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);
