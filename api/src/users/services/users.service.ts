import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { CreateUserRequestDto } from 'src/users/dtos/createUserRequest.dto';
import { Result } from 'utils/result';

type CreateUserError = 'USER_CREATION_FAILED';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(
    data: CreateUserRequestDto,
  ): Promise<Result<Omit<User, 'password'>, CreateUserError>> {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const user = await this.usersRepository.create({
        ...data,
        password: hashedPassword,
      });

      const userWithoutPassword = await this.usersRepository.excludePassword(
        user,
      );

      return Result.ok(userWithoutPassword);
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
