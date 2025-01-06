import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

//哈希轮数，轮数越多，计算哈希所需的时间就越长，这有助于防止暴力攻击。但是，哈希计算的轮数越多也意味着用户登录时计算哈希所需的时间越多
export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  // 注册用户,验证邮箱,密码加密
  async create(createUserDto: CreateUserDto) {
    const { email, password, name, identity } = createUserDto;
    //检查邮箱是否已经存在
    const userExists = await this.prisma.user.findUnique({ where: { email } })
    if (userExists) {
      throw new HttpException('email_already_exists', HttpStatus.BAD_REQUEST)
    }

    //密码加密
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );

    createUserDto.password = hashedPassword;
    createUserDto.identity=identity || 'Admin';

    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  // 查询所有用户
  findAll() {
    return this.prisma.user.findMany();
  }

  // 查询单个用户
  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    })
  }

  // 更新用户信息,密码加密
  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  // 删除用户
  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    })
  }
}
