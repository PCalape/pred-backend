import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth-guard';
import { QuestionDocument } from './questions.schema';
import { isValidObjectId } from 'mongoose';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard)
  @Get('questions')
  getQuestion(@Query('id') id: string): Promise<QuestionDocument> {
    if (!isValidObjectId(id)) throw new BadRequestException('Invalid id');

    return this.appService.getQuestion(id);
  }
}
