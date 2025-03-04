import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: Types.ObjectId })
  _id: string;

  @Prop()
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: false, select: false })
  password: string;

  @Prop({ required: false, select: false })
  salt: string;

  @Prop({ default: '' })
  image: string;

  @Prop({ type: String })
  providerId: string;

  @Prop({ type: String })
  provider: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
