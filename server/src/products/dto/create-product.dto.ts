import { ApiProperty } from "@nestjs/swagger";
export class CreateProductDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    price: number;

    @ApiProperty({ required: false ,nullable: true })
    description?: string | null;

    @ApiProperty()
    number: number;

    @ApiProperty({ required: false ,nullable: true})
    categoryId?: number;

    @ApiProperty({ required: false ,nullable: true})
    createUserId?: number | null;

    @ApiProperty({ required: false ,nullable: true})
    updateUserId?: number | null;



}
