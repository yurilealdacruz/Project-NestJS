import { Module } from '@nestjs/common';
import { userModule } from './module/users/user.module';
import { LoginModule } from './module/login/useCases/login.module';

@Module({
  imports: [userModule, LoginModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
 