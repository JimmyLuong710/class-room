import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ERole } from 'modules/shared/enums/auth.enum';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type UserDocument = User & Document;

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})
export class User {
  @Prop({ required: true })
  school: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  dateOfBirth: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  province: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ERole })
  role: ERole;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(mongoosePaginate);
