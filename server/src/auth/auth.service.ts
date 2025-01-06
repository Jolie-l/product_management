//src/auth/auth.service.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    // 1. 使用给定的电子邮件获取用户
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    // 如果用户不存在，抛出一个 NotFoundException
    if (!user) {
      throw new NotFoundException('No user found');
    }

    // 2. 检查密码是否正确(使用 bcrypt 进行哈希处理)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // 如果密码不正确，抛出一个 UnauthorizedException
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // 3. 生成 JWT 访问令牌并返回
    // 这里的 JWT 访问令牌包含了用户的 ID，以便在后续的请求中进行身份验证
    return {
      id:user.id,
      identity:user.identity,
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}