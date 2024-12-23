import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,IsNumber,IsString,MaxLength,MinLength,IsOptional } from "class-validator";
export class CreateProductDto {
    //进行输入验证
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    price: number;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    image?: string ;

    @IsString()
    @MaxLength(200)
    @IsOptional()
    @ApiProperty({ required: false })
    description?: string ;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    number: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty({ required: false})
    categoryId?: number ;

    @IsOptional()
    @IsNumber()
    @ApiProperty({ required: false })
    createUserId?: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty({ required: false })
    updateUserId?: number ;



}
