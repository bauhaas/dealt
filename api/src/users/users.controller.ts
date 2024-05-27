import {
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  Logger,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  CreateUserApiBody,
  CreateUserApiConflictResponse,
  CreateUserApiInternalServerErrorResponse,
  CreateUserApiOkResponse,
  CreateUserApiOperation,
} from 'src/users/docs/createUser.doc';
import { CreateUserRequestDto } from 'src/users/dtos/createUserRequest.dto';
import { UsersService } from 'src/users/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService, private logger: Logger) {}

  @Post()
  @ApiOperation(CreateUserApiOperation)
  @ApiBody(CreateUserApiBody)
  @ApiConflictResponse(CreateUserApiConflictResponse)
  @ApiOkResponse(CreateUserApiOkResponse)
  @ApiInternalServerErrorResponse(CreateUserApiInternalServerErrorResponse)
  async createUser(@Body() data: CreateUserRequestDto) {
    this.logger.debug(data);
    return (await this.usersService.createUser(data)).mapOrElse(
      (user) => {
        return user;
      },
      (error) => {
        if (error === 'USER_CREATION_FAILED')
          throw new ConflictException(error);

        throw new InternalServerErrorException('An unexpected error occurred');
      },
    );
  }
}
