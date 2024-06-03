import { Logger, Module } from '@nestjs/common';
import { AuthenticationService } from 'src/authentication/services/authentication.service';
import { JwtStrategy } from 'src/authentication/services/jwt.strategy';
import { LocalStrategy } from 'src/authentication/services/local.strategy';
import { UsersModule } from 'src/users/users.module';
import { AuthenticationController } from './controllers/authentication.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from 'src/authentication/services/session.serializer';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'secret', //TODO: use env variable
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtStrategy,
    SessionSerializer,
    Logger,
  ],
})
export class AuthenticationModule {}
