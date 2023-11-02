import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserModel {
  constructor(@InjectModel(User.name) public model: Model<UserDocument>) {}

  async save(user: User) {
    const createdUser = new this.model(user);
    return createdUser.save();
  }
}
