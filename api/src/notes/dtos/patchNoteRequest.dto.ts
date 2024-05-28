import { ApiProperty } from '@nestjs/swagger';

export class PatchNoteRequestDto {
  @ApiProperty({ required: false })
  title: string;

  @ApiProperty({ required: false })
  content: string;
}
