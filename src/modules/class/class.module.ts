import { Module } from '@nestjs/common';
import { SharedModule } from 'modules/shared/shared.module';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';

@Module({
  imports: [SharedModule],
  controllers: [ClassController],
  providers: [ClassService],
  exports: [ClassService],
})
export class ClassModule {}
