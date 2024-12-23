import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber, IsOptional, MaxLength, } from "class-validator";
export class CreateCategoryDto {

    //进行输入验证
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @ApiProperty()
    name: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    createUserId?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    updateUserId?: number;



}
