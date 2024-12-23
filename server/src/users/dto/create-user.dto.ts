import { ApiProperty } from "@nestjs/swagger";
import { IsString,IsEmail,IsNotEmpty,IsOptional,MaxLength,MinLength } from "class-validator";
export class CreateUserDto {
    //进行输入验证
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    @ApiProperty()
    password: string;

    @IsString()
    @IsOptional()
    @ApiProperty({required: false})
    name?: string;

}
