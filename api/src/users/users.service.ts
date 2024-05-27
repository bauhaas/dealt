import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { UsersRepository } from 'src/users/users.repository';
import { CreateUserRequestDto } from 'src/users/dtos/createUserRequest.dto';
import { Result } from 'src/result';

type CreateUserError = 'USER_CREATION_FAILED';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private logger: Logger,
  ) {}

  async createUser(
    data: CreateUserRequestDto,
  ): Promise<Result<User, CreateUserError>> {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const user = await this.usersRepository.create({
        ...data,
        password: hashedPassword,
      });

      return Result.ok(user);
    } catch (error) {
      return Result.err('USER_CREATION_FAILED');
    }
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findByEmail(email);
  }

  async findOneById(id: number): Promise<User | null> {
    return await this.usersRepository.findById(id);
  }
}
