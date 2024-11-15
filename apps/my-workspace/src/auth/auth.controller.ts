import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../app/users/users.service';
import { AuthService } from './roles/auth.service';
import { UserLoginDto } from '../app/users/user.login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }


  @Post('login')
  async login(@Body() loginDto: UserLoginDto) {
    const user = await this.authService.validateUser(loginDto.name, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.name, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return { access_token: accessToken };
  }
}
