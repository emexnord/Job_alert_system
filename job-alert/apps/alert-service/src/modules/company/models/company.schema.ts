import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
export type CompanyDocument = Company & Document;

@Schema({ timestamps: true })
export class Company {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: String })
  company_id: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  image: string;

  @Prop({ type: String })
  company_url: string;

  @Prop({ type: Number })
  jobs_count: number;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
