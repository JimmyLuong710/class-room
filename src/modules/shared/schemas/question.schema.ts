import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EQuestionType } from '../enums/schema.enum';

export type QuestionDocument = Question & Document;

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})
export class Question {
  @Prop({ required: true, enum: EQuestionType })
  questionType: EQuestionType;

  @Prop({ required: true })
  answer: string;

  @Prop({ required: true })
  score: number;

  @Prop()
  videoSolution?: string;

  @Prop()
  hint?: string;

  @Prop()
  imageHint?: string;

  @Prop()
  videoHint?: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
