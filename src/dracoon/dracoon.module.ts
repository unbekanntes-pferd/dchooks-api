import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { HooksService } from './hooks/hooks.service';
import { HooksController } from './hooks/hooks.controller';

@Module({
  providers: [AuthService, HooksService],
  controllers: [HooksController]
})
export class DracoonModule {}
