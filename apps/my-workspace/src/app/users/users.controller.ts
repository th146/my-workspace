import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from './users.entity';
import { UserLoginDto } from './user.login.dto'; // Wird in AuthController verwendet

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService, // Keine Notwendigkeit für AuthService hier
  ) {}

  // Create-Route (bleibt unverändert)
  @Post('create')
  async createUser(
    @Body() userData: { name: string; plainPassword: string; role?: Role }
  ) {
    if (!userData.plainPassword) {
      throw new UnauthorizedException('Password is required');
    }

    const role = userData.role || Role.User;

    // Benutzer erstellen
    await this.usersService.create({
      name: userData.name,
      password: userData.plainPassword,
      role,
    });
  }


}
