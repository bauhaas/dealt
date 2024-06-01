import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { RequiredScopes } from 'src/authentication/decorators/scope.decorator';
import { JwtAuthGuard } from 'src/authentication/jwt-auth-guard';
import { ScopesGuard } from 'src/authentication/scopes.guard';
import {
  CreateNoteApiBody,
  CreateNoteApiOkResponse,
  CreateNoteApiOperation,
} from 'src/notes/docs/createNote.doc';
import {
  DeleteNoteApiNoContentResponse,
  DeleteNoteApiOperation,
} from 'src/notes/docs/deleteNote.doc';
import {
  PatchNoteApiBody,
  PatchNoteApiOkResponse,
  PatchNoteApiOperation,
} from 'src/notes/docs/patchNote.doc';
import { CreateNoteRequestDto } from 'src/notes/dtos/createNoteRequest.dto';
import { PatchNoteRequestDto } from 'src/notes/dtos/patchNoteRequest.dto';
import { NotesService } from 'src/notes/notes.service';

@ApiTags('notes')
@ApiBearerAuth('access-token')
@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService, private logger: Logger) {}

  @Post()
  @UseGuards(JwtAuthGuard, ScopesGuard)
  @RequiredScopes(['notes_write'])
  @ApiOperation(CreateNoteApiOperation)
  @ApiBody(CreateNoteApiBody)
  @ApiOkResponse(CreateNoteApiOkResponse)
  async createNote(@Body() data: CreateNoteRequestDto, @Req() req: any) {
    this.logger.debug(req.user);
    return (await this.notesService.createNote(data, req.user.id)).mapOrElse(
      (res) => {
        return res;
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
  @UseGuards(JwtAuthGuard, ScopesGuard)
  @RequiredScopes(['notes_read'])
  @ApiOperation(CreateNoteApiOperation)
  @ApiOkResponse(CreateNoteApiOkResponse)
  async getAllNotes(@Req() req: any) {
    return (await this.notesService.getAllNotes(req.user.id)).mapOrElse(
      (res) => {
        return res;
      },
      (error) => {
        if (error === 'USER_NOT_FOUND') throw new NotFoundException(error);
        throw new InternalServerErrorException('An unexpected error occurred');
      },
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, ScopesGuard)
  @RequiredScopes(['notes_write'])
  @ApiOperation(PatchNoteApiOperation)
  @ApiBody(PatchNoteApiBody)
  @ApiOkResponse(PatchNoteApiOkResponse)
  @ApiParam({ name: 'id', required: true })
  async updateNote(@Param('id') id: string, @Body() data: PatchNoteRequestDto) {
    this.logger.debug(id);
    return (await this.notesService.patchNote(Number(id), data)).mapOrElse(
      (res) => {
        return res;
      },
      (error) => {
        switch (error) {
          default:
            throw new InternalServerErrorException(
              'An unexpected error occurred',
            );
        }
      },
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, ScopesGuard)
  @RequiredScopes(['notes_delete'])
  @ApiOperation(DeleteNoteApiOperation)
  @ApiNoContentResponse(DeleteNoteApiNoContentResponse)
  @ApiParam({ name: 'id', required: true })
  async deleteNote(@Param('id') id: string) {
    this.logger.debug(id);
    return (await this.notesService.deleteNote(Number(id))).mapOrElse(
      (res) => {
        return res;
      },
      (error) => {
        switch (error) {
          default:
            throw new InternalServerErrorException(
              'An unexpected error occurred',
            );
        }
      },
    );
  }
}
