import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EAttemptScore, EStudentReviewRole } from '../enums/schema.enum';

export type HomeworkDocument = Homework & Document;

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})
export class Homework {
  @Prop({ required: true })
  sentences: string;

  @Prop({ required: true })
  totalScore: number;

  @Prop()
  solutionFile: string;

  @Prop()
  solutionVideo: string;

  @Prop()
  password: string;

  @Prop()
  duration: number;

  @Prop()
  startTime: Date;

  @Prop()
  dueTime: string;

  @Prop()
  allowStudentReview: boolean;

  @Prop({ enum: EStudentReviewRole, required: true })
  studentRole: EStudentReviewRole;

  @Prop({ required: true })
  attempts: number;

  @Prop({ required: true, enum: EAttemptScore })
  attemptScore: EAttemptScore;
}

export const HomeworkSchema = SchemaFactory.createForClass(Homework);
