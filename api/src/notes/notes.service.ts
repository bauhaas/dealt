import { Injectable, Logger } from '@nestjs/common';
import { Note } from '@prisma/client';
import { CreateNoteRequestDto } from 'src/notes/dtos/createNoteRequest.dto';
import { NotesRepository } from 'src/notes/notes.repository';
import { Result } from 'src/result';
import { UsersService } from 'src/users/users.service';

type CreateNoteError = 'NOTE_CREATION_FAILED' | 'USER_NOT_FOUND';

@Injectable()
export class NotesService {
  constructor(
    private readonly notesRepository: NotesRepository,
    private readonly usersService: UsersService,
    private readonly logger: Logger,
  ) {}

  async createNote(
    data: CreateNoteRequestDto,
    userId: number,
  ): Promise<Result<Note, CreateNoteError>> {
    const user = await this.usersService.findOneById(userId);

    if (!user) {
      return Result.err('USER_NOT_FOUND');
    }

    try {
      const note = await this.notesRepository.create({
        ...data,
        author: {
          connect: { id: user.id },
        },
      });

      return Result.ok(note);
    } catch (error) {
      return Result.err('NOTE_CREATION_FAILED');
    }
  }

  async getAllNotes(userId: number): Promise<Result<Note[], CreateNoteError>> {
    const user = await this.usersService.findOneById(userId);

    if (!user) {
      return Result.err('USER_NOT_FOUND');
    }

    try {
      const notes = await this.notesRepository.getAllNotesByUserId(userId);
      return Result.ok(notes);
    } catch (error) {
      return Result.err('NOTE_CREATION_FAILED');
    }
  }
}
