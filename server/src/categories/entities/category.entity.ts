import { ApiProperty } from "@nestjs/swagger";
import { Category } from "@prisma/client";
export class CategoryEntity implements Category {
    @ApiProperty()
    name: string;
    @ApiProperty()
    id: number;
    @ApiProperty({ required: false })
    createUserId: number;
    @ApiProperty({ required: false })
    updateUserId: number;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
}
