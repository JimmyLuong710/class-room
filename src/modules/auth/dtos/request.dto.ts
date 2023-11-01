import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IsEmailOrPhone } from 'modules/shared/decorators/is-email-or-phone.decorator';
import { ERole } from 'modules/shared/enums/auth.enum';

@Exclude()
export class LoginRequestDto {
  @Expose()
  @ApiProperty({
    type: String,
    required: true,
    description: 'email or phone number',
    example: 'abc@gmail.com',
  })
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  username: string;

  @Expose()
  @ApiProperty({
    type: String,
    required: true,
    example: '*****',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  @MinLength(6, {
    message: 'Password is too short. Minimum length is 6 characters.',
  })
  password: string;
}

@Exclude()
export class SignupRequestDto {
  @Expose()
  @ApiProperty({
    required: true,
    type: String,
    example: 'UET',
  })
  @IsNotEmpty()
  school: string;

  @Expose()
  @ApiProperty({
    required: true,
    type: String,
    example: 'Nguyen Van A',
  })
  @IsNotEmpty()
  fullName: string;

  @Expose()
  @ApiProperty({
    required: true,
    type: String,
    example: '07/11/3001',
  })
  @IsNotEmpty()
  dateOfBirth: string;

  @Expose()
  @ApiProperty({
    required: true,
    type: String,
    example: 'abc@gmail.com',
    description: 'email or phone number',
  })
  @IsEmailOrPhone({
    message: 'Username must be a valid email or phone number',
  })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  username: string;

  @Expose()
  @ApiProperty({
    required: true,
    type: String,
    example: 'Ha Noi',
  })
  @IsNotEmpty()
  province: string;

  @Expose()
  @ApiProperty({
    required: true,
    type: String,
    example: '******',
  })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Password is too short. Minimum length is 6 characters.',
  })
  password: string;

  @Expose()
  @ApiProperty({
    required: true,
    type: String,
    example: ERole.STUDENT,
  })
  @IsNotEmpty()
  @IsEnum(ERole)
  role: ERole;
}
