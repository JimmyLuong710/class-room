import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { ERole } from 'modules/shared/enums/auth.enum';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
@Exclude()
@Index(['username'], { unique: true })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'UET',
  })
  @Column({ name: 'school' })
  school: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'Nguyen Van A',
  })
  @Column({ name: 'full_name' })
  fullName: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: '07/11/3001',
  })
  @Column({ name: 'date_of_birth' })
  dateOfBirth: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'abc@gmail.com',
    description: 'email or phone number',
  })
  @Column({ name: 'username' })
  username: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'Ha Noi',
  })
  @Column({ name: 'province' })
  province: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'role' })
  role: ERole;
}
