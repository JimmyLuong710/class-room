import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Class, ClassDocument } from '../schemas/class.schema';

@Injectable()
export class ClassModel {
  constructor(@InjectModel(Class.name) public model: PaginateModel<ClassDocument>) {}

  async save(doc: Class): Promise<Class> {
    const createdDoc = new this.model(doc);
    return (await createdDoc.save()).toObject();
  }
}
