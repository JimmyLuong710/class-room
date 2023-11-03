import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ClassService } from './class.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddClassRequestDto } from './dtos/request.dto';
import { ApiSuccessResponse } from 'modules/shared/decorators/api-success-response.decorator';
import { Class } from 'modules/shared/schemas/class.schema';
import { AddClassResponseDto } from './dtos/response.dto';
import { JwtAuthGuard } from 'modules/shared/gaurds/jwt.guard';
import { RolesGuard } from 'modules/shared/gaurds/role.gaurd';
import { Roles } from 'modules/shared/decorators/role.decorator';
import { ERole } from 'modules/shared/enums/auth.enum';

@Controller('classes')
@ApiTags('Class')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post('add-class')
  @Roles([ERole.TEACHER])
  @ApiSuccessResponse({ dataType: Class })
  async addClass(@Body() body: AddClassRequestDto, @Req() req): Promise<AddClassResponseDto> {
    return await this.classService.addClass(body, req.user);
  }
}
