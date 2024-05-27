import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteRequestDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;
}
