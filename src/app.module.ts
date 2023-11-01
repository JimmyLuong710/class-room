import { Module } from '@nestjs/common';
import { AuthModule } from 'modules/auth/auth.module';
import { SharedModule } from 'modules/shared/shared.module';

@Module({
  imports: [SharedModule, AuthModule],
})
export class AppModule {}
