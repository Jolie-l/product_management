
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//用于保护需要身份验证的路由

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}