import { Body, Controller, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesValidationPipe } from 'modules/shared/pipes/files-validation.pipe';
import { AddHomeworkRequestDto } from './dtos/request.dto';
import { HomeworkService } from './homework.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'modules/shared/gaurds/jwt.guard';
import { RolesGuard } from 'modules/shared/gaurds/role.gaurd';
import { Roles } from 'modules/shared/decorators/role.decorator';
import { ERole } from 'modules/shared/enums/auth.enum';

@Controller('homeworks')
@ApiTags('Homework')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}

  @Post('add-homework')
  @Roles([ERole.TEACHER])
  @UseInterceptors(FilesInterceptor('files'))
  async addHomework(
    @UploadedFiles(new FilesValidationPipe({ allowEmpty: false })) files: Express.Multer.File[],
    @Body() body: AddHomeworkRequestDto,
    @Req() req,
  ) {
    await this.homeworkService.addHomework(files, body, req.user);
  }
}
