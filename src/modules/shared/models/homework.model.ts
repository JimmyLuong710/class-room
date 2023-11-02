import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Homework, HomeworkDocument } from '../schemas/homework.schema';

@Injectable()
export class HomeworkModel {
  constructor(@InjectModel(Homework.name) public model: PaginateModel<HomeworkDocument>) {}

  async save(homework: Homework) {
    const createdHomework = new this.model(homework);
    return createdHomework.save();
  }
}
