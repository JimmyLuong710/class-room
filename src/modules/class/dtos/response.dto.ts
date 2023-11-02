import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AddClassResponseDto {
  @ApiProperty()
  @Expose()
  classId: string;

  @ApiProperty()
  @Expose()
  className: string;

  @ApiPropertyOptional()
  @Expose()
  coverImg?: string;

  @ApiPropertyOptional()
  @Expose()
  protectCode?: string;

  @ApiPropertyOptional()
  @Expose()
  fbGroupLink?: string;

  @ApiPropertyOptional()
  @Expose()
  fbPageLink?: string;

  @ApiProperty()
  @Expose()
  subject: string;

  @ApiProperty()
  @Expose()
  grade: string;
}
