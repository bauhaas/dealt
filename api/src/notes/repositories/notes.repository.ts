import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class NotesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.NoteCreateInput) {
    return this.prisma.note.create({
      data,
    });
  }

  async getNoteById(id: number) {
    return this.prisma.note.findUnique({
      where: {
        id,
      },
    });
  }

  async getAllNotesByUserId(userId: number) {
    return this.prisma.note.findMany({
      where: {
        authorId: userId,
      },
    });
  }

  async patchNoteById(id: number, data: Prisma.NoteUpdateInput) {
    return this.prisma.note.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteNoteById(id: number) {
    return this.prisma.note.delete({
      where: {
        id,
      },
    });
  }
}
