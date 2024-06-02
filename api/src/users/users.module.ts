import { Logger, Module, Provider } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

const repositories: Provider[] = [UsersRepository];

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, Logger, ...repositories],
  exports: [UsersService],
})
export class UsersModule {}
