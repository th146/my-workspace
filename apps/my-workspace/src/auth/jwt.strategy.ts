import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../app/users/users.service';
import { JwtPayload } from './roles/jwt-payload.interface';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'defaultSecret',
    });
  }

  // Die Validierung des JWT
  async validate(payload: JwtPayload) {
    const { sub } = payload;
    const user = await this.usersService.findOne(payload.name);  // Holen des Benutzers anhand der ID
    if (!user) {
      throw new Error('User not found');
    }
    return { id: user.id, name: user.name, role: user.role };  // Füge die Rolle hinzu
  }
}
