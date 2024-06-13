import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInDTO } from './dto/sign-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/user.entity';
import { SignUpDTO } from './dto/sign-up.dto';
import { UserExistedException } from 'src/exceptions/user/user-existed.exception';
import { UserNotFoundException } from 'src/exceptions/auth/user-not-found.exception';
import { PasswordUnmatchedException } from 'src/exceptions/auth/password-unmatched.exception';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async login(
    signInDTO: SignInDTO,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.validateUser(
      signInDTO.username,
      signInDTO.password,
    );
    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '30d',
      }),
    };
  }

  async join(signUpDTO: SignUpDTO): Promise<void> {
    const user = await this.userRepository.findOneByUsername(
      signUpDTO.username,
    );

    if (user) {
      throw new UserExistedException();
    }

    const newUser = new User();
    newUser.username = signUpDTO.username;

    const salt = await bcrypt.genSalt();
    newUser.password = await bcrypt.hash(signUpDTO.password, salt);

    this.userRepository.save(newUser);
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('refresh_token이 필요합니다.');
    }

    const payload = this.jwtService.verify(refreshToken, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });

    const user = await this.userRepository.findOneByUsername(payload.username);

    if (!user) {
      throw new UserNotFoundException();
    }

    const newPayload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(newPayload),
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOneByUsername(username);

    if (user == null) {
      throw new UserNotFoundException();
    }

    if (await bcrypt.compare(password, user.password)) {
      const { password, ...info } = user;
      return info;
    } else {
      throw new PasswordUnmatchedException();
    }
  }
}
