import {
  Controller,
  Get, Post, Body, Patch, Param,
  Delete, ParseIntPipe, NotFoundException,
  UseGuards, HttpException, HttpStatus
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('users')

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  //更新UsersController路由处理程序以返回UserEntity而不是Prisma.User对象
  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) {

    try {
      return new UserEntity(await this.usersService.create(createUserDto));
    } catch (error) {
      if (error instanceof HttpException) {
        // 如果错误是HttpException，直接抛出
        throw error;
      } else if (error.message === 'email_already_exists') {
        // 如果错误信息是'email_already_exists'，抛出特定的HttpException
        throw new HttpException('email_already_exists', HttpStatus.BAD_REQUEST);
      }
      // 其他未知错误，抛出内部服务器错误
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  @Get()
  @UseGuards(JwtAuthGuard)        //使用JwtAuthGuard保护路由
  @ApiBearerAuth()                //使用ApiBearerAuth装饰器在swagger文档中标识此路由需要JWT授权
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map(user => new UserEntity(user));
  }

  //做错误处理，如果user不存在，则抛出NotFoundException
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {  //ParseIntPipe转换动态url路径为数字
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return new UserEntity(user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return new UserEntity(await this.usersService.update(id, updateUserDto));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new UserEntity(await this.usersService.remove(id));
  }
}
