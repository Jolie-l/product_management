import { Controller, Get, Post, Body, Patch, Param, Delete ,ParseIntPipe,NotFoundException} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags,ApiCreatedResponse,ApiOkResponse } from '@nestjs/swagger';
import { CategoryEntity } from './entities/category.entity';
@ApiTags('categories')

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiCreatedResponse({type:CategoryEntity})
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOkResponse({type:CategoryEntity,isArray:true})
  findAll() {
    return this.categoriesService.findAll();
  }

  //做错误处理，如果category不存在，则抛出NotFoundException
  @Get(':id')
  @ApiOkResponse({type:CategoryEntity})
  async findOne(@Param('id', ParseIntPipe) id: number) {//ParseIntPipe转换动态url路径为数字
    const category = await this.categoriesService.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  @Patch(':id')
  @ApiOkResponse({type:CategoryEntity})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOkResponse({type:CategoryEntity})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
