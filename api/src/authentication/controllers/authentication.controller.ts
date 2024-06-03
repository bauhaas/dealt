import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticationService } from 'src/authentication/services/authentication.service';
import { LocalAuthGuard } from 'src/authentication/guards/local-auth.guard';
import { UsersService } from 'src/users/services/users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(
    private authenticationService: AuthenticationService,
    private usersService: UsersService,
  ) {}

  @Post('signup')
  async signup(@Body() createUserDto: any) {
    const user = await this.usersService.createUser(createUserDto);
    return this.authenticationService.login(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authenticationService.login(req.user);
  }
}
