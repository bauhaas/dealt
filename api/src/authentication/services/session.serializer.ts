import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: any, done: Function) {
    done(null, user.id);
  }

  async deserializeUser(id: any, done: Function) {
    const user = await this.usersService.findOneById(id);
    done(null, user);
  }
}
