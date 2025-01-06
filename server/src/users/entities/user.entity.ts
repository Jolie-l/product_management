import { ApiProperty } from "@nestjs/swagger";
import { Product, Category, User } from "@prisma/client";
import { Exclude } from "class-transformer";

export class UserEntity implements User {
    //实例化UserEntity对象的构造函数
    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @Exclude()
    password: string;

    @ApiProperty({ required: false })
    name: string;

    @ApiProperty()
    identity: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({ required: false })
    createProduct: Product[];

    @ApiProperty({ required: false })
    updateProduct: Product[];

    @ApiProperty({ required: false })
    createCategory: Category[];

    @ApiProperty({ required: false })
    updateCategory: Category[];
}
