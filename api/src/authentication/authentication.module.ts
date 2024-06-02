import { Logger, Module } from '@nestjs/common';
import { AuthenticationService } from 'src/authentication/services/authentication.service';
import { JwtStrategy } from 'src/authentication/services/jwt.strategy';
import { LocalStrategy } from 'src/authentication/services/local.strategy';
import { UsersModule } from 'src/users/users.module';
import { AuthenticationController } from './controllers/authentication.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

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
  providers: [AuthenticationService, LocalStrategy, JwtStrategy, Logger],
})
export class AuthenticationModule {}
