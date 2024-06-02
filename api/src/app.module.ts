import { Logger, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { NotesModule } from 'src/notes/notes.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    AuthenticationModule,
    UsersModule,
    NotesModule,
    PassportModule.register({ session: true }),
  ],
  providers: [Logger],
})
export class AppModule {}
