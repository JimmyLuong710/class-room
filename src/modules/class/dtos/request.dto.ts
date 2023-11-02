import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddClassRequestDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  className: string;

  @ApiProperty()
  coverImg?: string;

  @ApiPropertyOptional()
  @IsOptional()
  protectCode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  fbGroupLink?: string;

  @ApiPropertyOptional()
  @IsOptional()
  fbPageLink?: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  grade: string;
}
