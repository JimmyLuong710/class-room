import { Injectable } from '@nestjs/common';
import { HomeworkModel } from 'modules/shared/models/homework.model';
import { AddHomeworkRequestDto } from './dtos/request.dto';

@Injectable()
export class HomeworkService {
  constructor(private readonly homeworkModel: HomeworkModel) {}

  async addHomework(files: Express.Multer.File[], addHomeworkDto: AddHomeworkRequestDto): Promise<void> {
    await this.homeworkModel.save({
      ...addHomeworkDto,
      testFile: files?.[0].path,
      ...(files?.[1] && { solutionVideo: files[1].path }),
    });
  }
}
