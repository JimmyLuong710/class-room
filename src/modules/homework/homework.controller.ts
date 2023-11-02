import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesValidationPipe } from 'modules/shared/pipes/files-validation.pipe';
import { AddHomeworkRequestDto } from './dtos/request.dto';
import { HomeworkService } from './homework.service';

@Controller('homeworks')
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}

  @Post('upload-file')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(
    @UploadedFiles(new FilesValidationPipe({ allowEmpty: false })) files: Express.Multer.File[],
    @Body() body: AddHomeworkRequestDto,
  ) {
    await this.homeworkService.addHomework(files, body);
  }
}
