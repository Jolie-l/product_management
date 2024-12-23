import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {

  constructor(private prisma: PrismaService) { }

  //添加商品
  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    })
  }

  //查询所有商品
  findAll() {
    return this.prisma.product.findMany();
  }

  //查询单个商品，包括分类、创建者、更新者
  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        createUser: true,
        updateUser: true
      }
    })
  }

  //更新商品
  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    })
  }

  //删除商品
  remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    })
  }
}
