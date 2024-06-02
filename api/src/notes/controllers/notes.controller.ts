import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
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
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { RequiredScopes } from 'src/authentication/decorators/scope.decorator';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth-guard';
import { ScopesGuard } from 'src/authentication/guards/scopes.guard';
import {
  CreateNoteApiBody,
  CreateNoteApiOkResponse,
  CreateNoteApiOperation,
} from 'src/notes/controllers/docs/createNote.doc';
import {
  DeleteNoteApiForbiddenResponse,
  DeleteNoteApiNoContentResponse,
  DeleteNoteApiOperation,
} from 'src/notes/controllers/docs/deleteNote.doc';
import {
  PatchNoteApiBody,
  PatchNoteApiNotFoundResponse,
  PatchNoteApiOkResponse,
  PatchNoteApiOperation,
  PathNoteApiForbiddenResponse,
} from 'src/notes/controllers/docs/patchNote.doc';
import { CreateNoteRequestDto } from 'src/notes/dtos/createNoteRequest.dto';
import { PatchNoteRequestDto } from 'src/notes/dtos/patchNoteRequest.dto';
import { NotesService } from 'src/notes/services/notes.service';

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
    return (await this.notesService.createNote(data, req.user.id)).mapOrElse(
      (res) => {
        return res;
      },
      (error) => {
        switch (error) {
          case 'USER_NOT_FOUND':
            throw new NotFoundException(error);
          case 'NOTE_CREATION_FAILED':
            throw new InternalServerErrorException(error);
          default:
            throw new InternalServerErrorException(
              'An unexpected error occurred',
            );
        }
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
        switch (error) {
          case 'USER_NOT_FOUND':
            throw new NotFoundException(error);
          default:
            throw new InternalServerErrorException(
              'An unexpected error occurred',
            );
        }
      },
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, ScopesGuard)
  @RequiredScopes(['notes_write'])
  @ApiOperation(PatchNoteApiOperation)
  @ApiBody(PatchNoteApiBody)
  @ApiOkResponse(PatchNoteApiOkResponse)
  @ApiNotFoundResponse(PatchNoteApiNotFoundResponse)
  @ApiForbiddenResponse(PathNoteApiForbiddenResponse)
  @ApiParam({ name: 'id', required: true })
  async updateNote(
    @Param('id') id: string,
    @Req() req: any,
    @Body() data: PatchNoteRequestDto,
  ) {
    return (
      await this.notesService.patchNote(Number(id), req.user.id, data)
    ).mapOrElse(
      (res) => {
        return res;
      },
      (error) => {
        switch (error) {
          case 'NOTE_NOT_FOUND':
            throw new NotFoundException(error);
          case 'NOTE_ACCESS_FORBIDDEN':
            throw new ForbiddenException(error);
          default:
            throw new InternalServerErrorException(
              'An unexpected error occurred',
            );
        }
      },
    );
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard, ScopesGuard)
  @RequiredScopes(['notes_delete'])
  @ApiOperation(DeleteNoteApiOperation)
  @ApiNoContentResponse(DeleteNoteApiNoContentResponse)
  @ApiForbiddenResponse(DeleteNoteApiForbiddenResponse)
  @ApiParam({ name: 'id', required: true })
  async deleteNote(@Param('id') id: string, @Req() req: any) {
    return (
      await this.notesService.deleteNote(Number(id), req.user.id)
    ).mapOrElse(
      (res) => {
        return res;
      },
      (error) => {
        switch (error) {
          case 'NOTE_ACCESS_FORBIDDEN':
            throw new ForbiddenException(error);
          default:
            throw new InternalServerErrorException(
              'An unexpected error occurred',
            );
        }
      },
    );
  }
}
