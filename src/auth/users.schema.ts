import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RoleEnum } from './auth.enums';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  email?: string;

  @Prop({
    type: String,
    enum: RoleEnum,
    default: RoleEnum.STUDENT,
  })
  role: string;

  @Prop()
  fullName?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
