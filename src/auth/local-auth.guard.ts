// src/auth/jwt-auth.guard.ts
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const { username, password }: any = request.body;

    if (username && password) {
      return super.canActivate(context);
    } else {
      throw new UnauthorizedException('입력 정보를 다시 확인해주세요.');
    }
  }

  handleRequest(err: any, user: any, info: any) {
    throw err || new UnauthorizedException('Invalid credentials');
    return user;
  }
}
