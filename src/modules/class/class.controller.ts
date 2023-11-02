import { Body, Controller, Post } from '@nestjs/common';
import { ClassService } from './class.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddClassRequestDto } from './dtos/request.dto';
import { ApiSuccessResponse } from 'modules/shared/decorators/api-success-response.decorator';
import { Class } from 'modules/shared/schemas/class.schema';
import { AddClassResponseDto } from './dtos/response.dto';

@Controller('classes')
@ApiTags('Class')
@ApiBearerAuth()
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post('add-class')
  @ApiSuccessResponse({ dataType: Class })
  async addClass(@Body() body: AddClassRequestDto): Promise<AddClassResponseDto> {
    return await this.classService.addClass(body);
  }
}
