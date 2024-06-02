import { Injectable, Logger } from '@nestjs/common';
import { Note } from '@prisma/client';
import { CreateNoteRequestDto } from 'src/notes/dtos/createNoteRequest.dto';
import { PatchNoteRequestDto } from 'src/notes/dtos/patchNoteRequest.dto';
import { NotesRepository } from 'src/notes/notes.repository';
import { Result } from 'src/result';
import { UsersService } from 'src/users/users.service';

type NoteError =
  | 'NOTE_CREATION_FAILED'
  | 'NOTE_RETRIEVAL_FAILED'
  | 'USER_NOT_FOUND'
  | 'NOTE_UPDATE_FAILED'
  | 'NOTE_DELETION_FAILED'
  | 'NOTE_ACCESS_FORBIDDEN'
  | 'NOTE_NOT_FOUND';

@Injectable()
export class NotesService {
  constructor(
    private readonly notesRepository: NotesRepository,
    private readonly usersService: UsersService,
  ) {}

  async createNote(
    data: CreateNoteRequestDto,
    userId: number,
  ): Promise<Result<Note, NoteError>> {
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

  async getAllNotes(userId: number): Promise<Result<Note[], NoteError>> {
    const user = await this.usersService.findOneById(userId);

    if (!user) {
      return Result.err('USER_NOT_FOUND');
    }

    try {
      const notes = await this.notesRepository.getAllNotesByUserId(userId);
      return Result.ok(notes);
    } catch (error) {
      return Result.err('NOTE_RETRIEVAL_FAILED');
    }
  }

  async patchNote(
    noteId: number,
    userId: number,
    data: PatchNoteRequestDto,
  ): Promise<Result<Note, NoteError>> {
    const note = await this.notesRepository.getNoteById(noteId);

    if (!note) {
      return Result.err('NOTE_NOT_FOUND');
    }

    if (note.authorId !== userId) {
      return Result.err('NOTE_ACCESS_FORBIDDEN');
    }

    try {
      const updatedNote = await this.notesRepository.patchNoteById(
        noteId,
        data,
      );
      return Result.ok(updatedNote);
    } catch (error) {
      return Result.err('NOTE_UPDATE_FAILED');
    }
  }

  async deleteNote(
    noteId: number,
    userId: number,
  ): Promise<Result<void, NoteError>> {
    const note = await this.notesRepository.getNoteById(noteId);

    //no need to notice not found case. Consider it as ok
    if (!note) {
      return Result.ok(undefined);
    }

    if (note.authorId !== userId) {
      return Result.err('NOTE_ACCESS_FORBIDDEN');
    }

    try {
      await this.notesRepository.deleteNoteById(noteId);
      return Result.ok(undefined);
    } catch (error) {
      return Result.err('NOTE_DELETION_FAILED');
    }
  }
}
