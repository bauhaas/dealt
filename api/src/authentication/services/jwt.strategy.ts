import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService, private logger: Logger) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret', //TODO: use env variable
    });
  }

  async validate(payload: any) {
    this.logger.debug(payload, 'validate jwtstrat');
    const user = await this.usersService.findOneById(payload.sub);
    if (user) {
      this.logger.debug('Validated User:', {
        id: user.id,
        email: user.email,
        scopes: payload.scopes,
      });
      return { id: user.id, email: user.email, scopes: payload.scopes };
    }
    return null;
  }
}
