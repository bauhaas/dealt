import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService, private logger: Logger) {}

  @Post()
  async createUser(@Body() data: Prisma.UserCreateInput) {
    this.logger.debug(data);
    return this.usersService.createUser(data);
  }
}
