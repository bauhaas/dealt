import { Logger, Module, Provider } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { NotesRepository } from 'src/notes/repositories/notes.repository';
import { UsersModule } from 'src/users/users.module';
import { NotesController } from './controllers/notes.controller';
import { NotesService } from './services/notes.service';

const repositories: Provider[] = [NotesRepository];

@Module({
  imports: [UsersModule],
  controllers: [NotesController],
  providers: [NotesService, PrismaService, Logger, ...repositories],
  exports: [NotesService],
})
export class NotesModule {}
