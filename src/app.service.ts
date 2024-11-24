import { Injectable } from '@nestjs/common';
import { Question, QuestionDocument } from './questions.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { StudentAnswer } from './student-answers.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
    @InjectModel(StudentAnswer.name)
    private studentAnswerModel: Model<StudentAnswer>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getQuestion(id: string): Promise<QuestionDocument> {
    return this.questionModel.findById(id);
  }

  async saveStudentAnswer(answer: StudentAnswer): Promise<void> {
    await this.studentAnswerModel.create(answer);
  }
}
