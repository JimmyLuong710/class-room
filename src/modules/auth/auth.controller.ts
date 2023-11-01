import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { ApiSuccessResponse } from 'modules/shared/decorators/api-success-response.decorator';
import { AuthService } from './auth.service';
import { LoginRequestDto, SignupRequestDto } from './dtos/request.dto';
import { LoginResponseDto, SignupResponseDto } from './dtos/response.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiSuccessResponse({ dataType: SignupResponseDto })
  async signup(@Body() credentials: SignupRequestDto): Promise<SignupResponseDto> {
    await this.authService.signup(credentials);
    return plainToInstance(SignupResponseDto, credentials);
  }

  @Post('login')
  @ApiSuccessResponse({ dataType: LoginResponseDto })
  async login(@Body() loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    return await this.authService.login(loginDto);
  }
}
