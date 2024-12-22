import { ApiProperty } from "@nestjs/swagger";
import { Product } from "@prisma/client";
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

    @ApiProperty({ required: false, nullable: true })
    createUserId: number | null;

    @ApiProperty({ required: false, nullable: true })
    updateUserId: number | null;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
