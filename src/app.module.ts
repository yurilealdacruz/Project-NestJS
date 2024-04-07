import { Module } from '@nestjs/common';
import { userModule } from './module/users/user.module';
import { LoginModule } from './module/login/useCases/login.module';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

@Module({
  imports: [userModule, LoginModule],
  controllers: [],
  providers: [{
    provide: APP_PIPE,
    useClass: ZodValidationPipe
  }],
})
export class AppModule {}
 