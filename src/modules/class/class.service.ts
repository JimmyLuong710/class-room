import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ClassModel } from 'modules/shared/models/class.model';
import { generateRandomCode } from 'modules/shared/utils/generate-randon-code';
import { AddClassRequestDto } from './dtos/request.dto';
import { AddClassResponseDto } from './dtos/response.dto';
import { IJwtPayload } from 'modules/shared/interfaces/auth.interface';
import mongoose from 'mongoose';

@Injectable()
export class ClassService {
  constructor(private readonly classModel: ClassModel) {}

  async addClass(addClassDto: AddClassRequestDto, jwtPayload: IJwtPayload): Promise<AddClassResponseDto> {
    const classId: string = generateRandomCode(6);
    return plainToClass(
      AddClassResponseDto,
      await this.classModel.save({ ...addClassDto, classId, owner: new mongoose.Types.ObjectId(jwtPayload?._id) }),
    );
  }
}
