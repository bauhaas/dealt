import { ApiBodyOptions } from '@nestjs/swagger';
import { CreateUserRequestDto } from 'src/users/dtos/createUserRequest.dto';

export const CreateUserApiOperation = {
  summary: 'Create a new user',
};

export const CreateUserApiBody: ApiBodyOptions = {
  type: CreateUserRequestDto,
  examples: {
    'Create a user': {
      value: {
        email: 'john.doe@dealt.com',
        password: 'password',
      },
    },
  },
};

export const CreateUserApiOkResponse = {
  status: 200,
  description: 'User created successfully',
  content: {
    'application/json': {
      example: {
        id: 1,
        email: 'john.doe@dealt.com',
      },
    },
  },
};

export const CreateUserApiConflictResponse = {
  status: 409,
  description: 'User creation conflict',
  content: {
    'application/json': {
      example: {
        statusCode: 409,
        message: 'USER_CREATION_FAILED',
        error: 'Conflict',
      },
    },
  },
};

export const CreateUserApiInternalServerErrorResponse = {
  status: 500,
  description: 'Internal server error',
  content: {
    'application/json': {
      example: {
        statusCode: 500,
        message: 'An unexpected error occurred',
        error: 'Internal Server Error',
      },
    },
  },
};
