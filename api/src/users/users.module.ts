import { Logger, Module, Provider } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UsersRepository } from 'src/users/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const repositories: Provider[] = [UsersRepository];

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, Logger, ...repositories],
  exports: [UsersService],
})
export class UsersModule {}
