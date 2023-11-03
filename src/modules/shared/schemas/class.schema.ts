import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type ClassDocument = Class & Document;

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})
export class Class {
  @ApiProperty()
  @Prop({ required: true, unique: true })
  classId: string;

  @ApiProperty()
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  owner: Types.ObjectId;

  @ApiProperty()
  @Prop({ required: true })
  className: string;

  @ApiPropertyOptional()
  @Prop()
  coverImg?: string;

  @ApiPropertyOptional()
  @Prop()
  protectCode?: string;

  @ApiPropertyOptional()
  @Prop()
  fbGroupLink?: string;

  @ApiPropertyOptional()
  @Prop()
  fbPageLink?: string;

  @ApiProperty()
  @Prop({ required: true })
  subject: string;

  @ApiProperty()
  @Prop({ required: true })
  grade: string;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
ClassSchema.plugin(mongoosePaginate);
