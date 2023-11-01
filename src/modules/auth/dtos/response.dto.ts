import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { ERole } from 'modules/shared/enums/auth.enum';

@Exclude()
export class LoginResponseDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '0x123...',
  })
  accessToken: string;
}

@Exclude()
export class SignupResponseDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'abc@gmail.com',
  })
  @Expose()
  username: string;

  @ApiProperty({
    type: String,
    required: true,
    example: ERole.STUDENT,
  })
  @Expose()
  role: ERole.STUDENT;
}
