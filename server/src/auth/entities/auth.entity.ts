import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {

  @ApiProperty()
  id: number;

  @ApiProperty()
  accessToken: string;


}