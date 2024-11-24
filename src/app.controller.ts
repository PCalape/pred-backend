import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth-guard';
import { QuestionDocument } from './questions.schema';
import { isValidObjectId, ObjectId, Types } from 'mongoose';
import { AnswerInput } from './dto/answer.input';
import { AuthUserDto } from './auth/auth.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard)
  @Get('questions')
  async getQuestion(@Query('id') id: string): Promise<QuestionDocument> {
    if (!isValidObjectId(id)) throw new BadRequestException('Invalid id');

    return this.appService.getQuestion(id);
  }

  @UseGuards(AuthGuard)
  @Post('answers')
  async answer(
    @Request() req: Request & { user: AuthUserDto },
    @Body() answerInput: AnswerInput,
  ): Promise<boolean> {
    if (!isValidObjectId(answerInput.question))
      throw new BadRequestException('Invalid id');

    const question = await this.appService.getQuestion(answerInput.question);
    const isCorrect = question.answer === answerInput.answer;

    await this.appService.saveStudentAnswer({
      student: new Types.ObjectId(req.user.sub) as unknown as ObjectId,
      question: question._id as unknown as ObjectId,
      answer: answerInput.answer,
      isCorrect,
      confidence: answerInput.confidence,
    });

    return isCorrect;
  }
}
