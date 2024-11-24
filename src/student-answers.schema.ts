import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type StudentAnswerDocument = HydratedDocument<StudentAnswer>;

@Schema({ timestamps: true })
export class StudentAnswer {
  @Prop({ required: true })
  student: ObjectId;

  @Prop({ required: true })
  question: ObjectId;

  @Prop({ required: true })
  answer: string;

  @Prop({ required: true })
  isCorrect: boolean;

  @Prop()
  confidence?: number;

  @Prop()
  timeSpent?: number;
}

export const StudentAnswerSchema = SchemaFactory.createForClass(StudentAnswer);
