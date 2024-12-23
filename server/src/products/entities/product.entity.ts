import { ApiProperty } from "@nestjs/swagger";
import { Product } from "@prisma/client";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { UserEntity } from "src/users/entities/user.entity";

export class ProductEntity implements Product {

    @ApiProperty()
    name: string;

    @ApiProperty()
    id: number;

    @ApiProperty()
    price: number;

    @ApiProperty({ required: false, nullable: true })
    description: string | null;

    @ApiProperty()
    number: number;

    @ApiProperty({ required: false, nullable: true })
    categoryId: number | null;

    @ApiProperty({ required: false ,nullable: true })
    category?: CategoryEntity | null;

    @ApiProperty({ required: false, nullable: true })
    createUserId: number | null;

    @ApiProperty({ required: false, nullable: true })
    createUser?: UserEntity | null;

    @ApiProperty({ required: false, nullable: true })
    updateUserId: number | null;

    @ApiProperty({ required: false, nullable: true })
    updateUser?: UserEntity | null;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    //处理包含在商品信息中的用户信息密码
    
}
