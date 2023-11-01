import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class LoginRequestDto {
  @Expose()
  @ApiProperty({
    type: String,
    required: true,
    example: '0x123...',
  })
  @IsString()
  @IsNotEmpty()
  ggAccessToken: string;
}
