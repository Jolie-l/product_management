import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';


export const jwtSecret = "Jolie-secret-key"

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    //配置JwtModule将用于生成和验证的JWT令牌,并设置过期时间为1小时
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '1h' }
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule { }
