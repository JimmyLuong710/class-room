import { Module } from '@nestjs/common';
import { AuthModule } from 'modules/auth/auth.module';
import { HomeworkModule } from 'modules/homework/homework.module';
import { SharedModule } from 'modules/shared/shared.module';

@Module({
  imports: [SharedModule, AuthModule, HomeworkModule],
})
export class AppModule {}
