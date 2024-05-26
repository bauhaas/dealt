import { Logger, Module } from '@nestjs/common';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { JwtStrategy } from 'src/authentication/jwt.strategy';
import { LocalStrategy } from 'src/authentication/local.strategy';
import { UsersModule } from 'src/users/users.module';
import { AuthenticationController } from './authentication.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from 'src/authentication/session.serializer';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      // secret: process.env.JWT_SECRET,
      secret: 'secret',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtStrategy,
    Logger,
    SessionSerializer,
  ],
})
export class AuthenticationModule {}
