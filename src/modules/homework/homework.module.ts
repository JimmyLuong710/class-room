import { Module } from '@nestjs/common';
import { SharedModule } from 'modules/shared/shared.module';
import { HomeworkService } from './homework.service';
import { HomeworkController } from './homework.controller';

@Module({
  imports: [SharedModule],
  providers: [HomeworkService],
  controllers: [HomeworkController],
  exports: [HomeworkService],
})
export class HomeworkModule {}
