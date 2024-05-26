import { Logger, Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, Logger],
  exports: [UsersService],
})
export class UsersModule {}
