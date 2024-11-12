import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@my-workspace/api-interfaces';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../app/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  // Simuliert den Abruf des Google-Profils (in einer echten Implementierung hier mit OAuth)
  async getGoogleProfile(username: string, password: string): Promise<any> {
    // In einer echten Implementierung würdest du den Google OAuth Flow verwenden.
    // Hier simulieren wir nur ein Profil.
    return { id: 'google-id', name: { givenName: 'John', familyName: 'Doe' } }; // Beispiel
  }

  // Validiert den Google-Nutzer in der Datenbank oder erstellt ihn, falls er nicht existiert
  async validateGoogleUser(profile: any): Promise<any> {
    let user = await this.userRepo.findOne({ where: { googleId: profile.id } });

    if (!user) {
      // Benutzer erstellen, wenn er nicht existiert
      user = this.userRepo.create({
        googleId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
      });
      await this.userRepo.save(user);
    }

    return user; // Gibt den User zurück
  }

  // JWT für den Benutzer generieren
  async login(user: User): Promise<any> {
    const payload = { googleId: user.googleId, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1h' }), // JWT mit Ablaufzeit von 1 Stunde
    };
  }
}
