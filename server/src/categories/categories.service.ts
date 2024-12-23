import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  //添加分类
  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: createCategoryDto,
    })
  }

    //查询所有分类
  findAll() {
    return this.prisma.category.findMany();
  }

  //查询单个分类，同时返回，分类下所有商品，创建者和更新者信息
  findOne(id: number) {
    return this.prisma.category.findUnique({
      where: { id },
      include: {
        createUser: true,
        updateUser: true,
        Product: true
      }
    })
  }

  //更新分类
  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    })
  }

  //删除分类
  remove(id: number) {
    return this.prisma.category.delete({
      where: { id },
    })
  }
}
