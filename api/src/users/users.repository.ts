import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

// https://www.prisma.io/docs/orm/prisma-client/queries/excluding-fields
// issue still open: https://github.com/prisma/prisma/issues/5042
function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[],
): Omit<User, Key> {
  const entries = Object.entries(user as Record<string, unknown>).filter(
    ([key]) => !keys.includes(key as Key),
  );
  return Object.fromEntries(entries) as Omit<User, Key>;
}

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async excludePassword(user: Prisma.UserGetPayload<{}>) {
    return exclude(user, ['password']);
  }
}
