import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class AnswerInput {
  @IsString()
  question: string;

  @IsString()
  answer: string;

  @IsOptional()
  @IsNumber()
  @Max(100)
  @Min(0)
  confidence?: number;
}
