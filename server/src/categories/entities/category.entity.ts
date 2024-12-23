import { ApiProperty } from "@nestjs/swagger";
import { Category,  } from "@prisma/client";
import { UserEntity } from "src/users/entities/user.entity";
export class CategoryEntity implements Category {
    @ApiProperty()
    name: string;

    @ApiProperty()
    id: number;

    @ApiProperty({ required: false ,nullable: true })
    createUserId: number | null;

    @ApiProperty({ required: false ,nullable: true })
    createUser?: UserEntity | null;

    @ApiProperty({ required: false ,nullable: true })
    updateUserId: number | null;

    @ApiProperty({ required: false, nullable: true })
    updateUser?: UserEntity | null;

    @ApiProperty()
    createdAt: Date;
    
    @ApiProperty()
    updatedAt: Date;
}
