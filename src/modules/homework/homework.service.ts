import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IJwtPayload } from 'modules/shared/interfaces/auth.interface';
import { ClassModel } from 'modules/shared/models/class.model';
import { HomeworkModel } from 'modules/shared/models/homework.model';
import { AddHomeworkRequestDto } from './dtos/request.dto';

@Injectable()
export class HomeworkService {
  constructor(
    private readonly homeworkModel: HomeworkModel,
    private readonly classModel: ClassModel,
  ) {}

  async addHomework(
    files: Express.Multer.File[],
    addHomeworkDto: AddHomeworkRequestDto,
    jwtPayload: IJwtPayload,
  ): Promise<void> {
    const classDoc = await this.classModel.model.findOne({ classId: addHomeworkDto.class }).populate('owner');
    const classOwner: any = classDoc?.owner;

    if (classOwner?.username != jwtPayload.username) throw new UnauthorizedException('Unauthorized');

    await this.homeworkModel.save({
      ...addHomeworkDto,
      class: classDoc._id,
      testFile: files?.[0].path,
      ...(files?.[1] && { solutionVideo: files[1].path }),
    });
  }
}
