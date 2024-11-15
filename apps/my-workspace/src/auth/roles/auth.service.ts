import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../app/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Benutzer anhand des Namens und Passworts validieren
  async validateUser(name: string, password: string) {
    const user = await this.usersService.findOne(name);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  // Token generieren
  async generateToken(user: any) {
    const payload = { username: user.name, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
