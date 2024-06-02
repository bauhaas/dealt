import {
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateUserApiBody,
  CreateUserApiConflictResponse,
  CreateUserApiInternalServerErrorResponse,
  CreateUserApiOkResponse,
  CreateUserApiOperation,
} from 'src/users/controllers/docs/createUser.doc';
import { CreateUserRequestDto } from 'src/users/dtos/createUserRequest.dto';
import { UsersService } from 'src/users/services/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @ApiOperation(CreateUserApiOperation)
  @ApiBody(CreateUserApiBody)
  @ApiConflictResponse(CreateUserApiConflictResponse)
  @ApiOkResponse(CreateUserApiOkResponse)
  @ApiInternalServerErrorResponse(CreateUserApiInternalServerErrorResponse)
  async createUser(@Body() data: CreateUserRequestDto) {
    return (await this.usersService.createUser(data)).mapOrElse(
      (user) => {
        return user;
      },
      (error) => {
        switch (error) {
          case 'USER_CREATION_FAILED':
            throw new ConflictException(error);
          default:
            throw new InternalServerErrorException(
              'An unexpected error occurred',
            );
        }
      },
    );
  }
}
