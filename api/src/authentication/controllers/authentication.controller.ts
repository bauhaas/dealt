import {
  Body,
  Controller,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from 'src/authentication/services/authentication.service';
import { LocalAuthGuard } from 'src/authentication/guards/local-auth.guard';
import { UsersService } from 'src/users/services/users.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private authenticationService: AuthenticationService,
    private usersService: UsersService,
    private logger: Logger,
  ) {}

  @Post('signup')
  async signup(@Body() createUserDto: any) {
    this.logger.debug('Sign up user');
    const user = await this.usersService.createUser(createUserDto);
    return this.authenticationService.login(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    this.logger.debug('try to login');
    return this.authenticationService.login(req.user);
  }
}
