import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/sign-up.dto';
import { SignInDTO } from './dto/sign-in.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // 로그인
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() signInDTO: SignInDTO) {
    return this.authService.login(signInDTO);
  }

  // 회원가입
  @HttpCode(HttpStatus.CREATED)
  @Post('join')
  join(@Body() signUpDTO: SignUpDTO) {
    return this.authService.join(signUpDTO);
  }

  // 토큰 재발급
  @HttpCode(HttpStatus.ACCEPTED)
  @Post('refreshToken')
  async refresh(@Body('refresh_token') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}
