import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { EAttemptScore, EQuestionType, EStudentReviewRole } from 'modules/shared/enums/schema.enum';

export class AddQuestionRequestDto {
  @ApiProperty({ required: true, enum: EQuestionType })
  @IsNotEmpty()
  questionType: EQuestionType;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  answer: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  score: number;

  @ApiPropertyOptional()
  @IsOptional()
  videoSolution?: string;

  @ApiPropertyOptional()
  @IsOptional()
  hint?: string;

  @ApiPropertyOptional()
  @IsOptional()
  imageHint?: string;

  @ApiPropertyOptional()
  @IsOptional()
  videoHint?: string;
}

export class AddHomeworkRequestDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  class: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value) || 0)
  sentences: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @Transform(({ value }) => Number(value) || 0)
  totalScore: number;

  @ApiPropertyOptional()
  solutionVideo?: string;

  @ApiPropertyOptional()
  password?: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'Duration in minute',
  })
  @IsNumber()
  @IsOptional()
  duration?: number;

  @ApiPropertyOptional()
  @IsOptional()
  startTime?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  dueTime?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  allowStudentReview: boolean = true;

  @ApiProperty({ enum: EStudentReviewRole, required: true })
  @IsNotEmpty()
  studentRole: EStudentReviewRole;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  attempts: number;

  @ApiProperty({ required: true, enum: EAttemptScore })
  @IsNotEmpty()
  attemptScore: EAttemptScore;

  @ApiProperty({ required: true, isArray: true, type: AddHomeworkRequestDto })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddQuestionRequestDto)
  questions: AddQuestionRequestDto[];
}
