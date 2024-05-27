import { Logger, Module, Provider } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { NotesRepository } from 'src/notes/notes.repository';
import { UsersModule } from 'src/users/users.module';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

const repositories: Provider[] = [NotesRepository];

@Module({
  imports: [UsersModule],
  controllers: [NotesController],
  providers: [NotesService, PrismaService, Logger, ...repositories],
  exports: [NotesService],
})
export class NotesModule {}
