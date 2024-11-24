import { Injectable } from '@nestjs/common';
import { Question, QuestionDocument } from './questions.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getQuestion(id: string): Promise<QuestionDocument> {
    return this.questionModel.findById(id);
  }
}
