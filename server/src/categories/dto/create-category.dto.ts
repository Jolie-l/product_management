import { ApiProperty } from "@nestjs/swagger";
export class CreateCategoryDto {
    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    createUserId?: number;

    @ApiProperty({ required: false })
    updateUserId?: number;

 

}
