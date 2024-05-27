import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequestDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
