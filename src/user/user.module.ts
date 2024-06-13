import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
  controllers: [UserController]
})
export class UserModule {}
