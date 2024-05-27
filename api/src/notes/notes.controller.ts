import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authentication/jwt-auth-guard';
import {
  CreateNoteApiBody,
  CreateNoteApiOkResponse,
  CreateNoteApiOperation,
} from 'src/notes/docs/createNote.doc';
import { CreateNoteRequestDto } from 'src/notes/dtos/createNoteRequest.dto';
import { NotesService } from 'src/notes/notes.service';

@ApiTags('notes')
@ApiBearerAuth('access-token')
@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService, private logger: Logger) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation(CreateNoteApiOperation)
  @ApiBody(CreateNoteApiBody)
  @ApiOkResponse(CreateNoteApiOkResponse)
  async createNote(@Body() data: CreateNoteRequestDto, @Req() req: any) {
    this.logger.debug(req.user);
    return (await this.notesService.createNote(data, req.user.id)).mapOrElse(
      (note) => {
        return note;
      },
      (error) => {
        if (error === 'USER_NOT_FOUND') throw new NotFoundException(error);
        else if (error === 'NOTE_CREATION_FAILED')
          throw new InternalServerErrorException(error);
        throw new InternalServerErrorException('An unexpected error occurred');
      },
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation(CreateNoteApiOperation)
  @ApiOkResponse(CreateNoteApiOkResponse)
  async getAllNotes(@Req() req: any) {
    return (await this.notesService.getAllNotes(req.user.id)).mapOrElse(
      (notes) => {
        return notes;
      },
      (error) => {
        if (error === 'USER_NOT_FOUND') throw new NotFoundException(error);
        throw new InternalServerErrorException('An unexpected error occurred');
      },
    );
  }
}
