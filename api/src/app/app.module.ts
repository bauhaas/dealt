import { Logger, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { ScopesGuard } from 'src/authentication/scopes.guard';
import { NotesModule } from 'src/notes/notes.module';
import { UsersModule } from 'src/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AuthenticationModule,
    UsersModule,
    NotesModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: ScopesGuard,
    // },
    Logger,
  ],
})
export class AppModule {}
