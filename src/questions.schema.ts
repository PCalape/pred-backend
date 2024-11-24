import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type QuestionDocument = HydratedDocument<Question>;

@Schema({ timestamps: true })
export class Question {
  @Prop({ required: true })
  subject: string;

  @Prop()
  number?: number;

  @Prop({ required: true })
  question: string;

  @Prop()
  choiceA?: string;

  @Prop()
  choiceB?: string;

  @Prop()
  choiceC?: string;

  @Prop()
  choiceD?: string;

  @Prop({ required: true })
  answer: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
