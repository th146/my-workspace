import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { OAuth2Client } from 'google-auth-library';  // Google OAuth2Client
import { UsersEntity } from '../app/users/users.entity';

// Dein Google OAuth2Client
const client = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID');  // Ersetze durch deine Client-ID

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity) private readonly userRepo: Repository<UsersEntity>,
    private readonly jwtService: JwtService,
  ) {}

  // Google-Token verifizieren und Profil abrufen
  async verifyGoogleToken(token: string): Promise<any> {
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: 'YOUR_GOOGLE_CLIENT_ID', // Deine Google Client-ID hier
      });

      // Gibt das Google-Profil zurück
      return ticket.getPayload();
    } catch (error) {
      console.error('Error verifying Google token', error);
      return null;
    }
  }

  // Validiert den Google-User oder erstellt ihn
  async validateGoogleUser(profile: any): Promise<any> {
    let user = await this.userRepo.findOne({ where: { googleId: profile.sub } });

    if (!user) {
      // Benutzer erstellen, wenn er nicht existiert
      user = this.userRepo.create({
        googleId: profile.sub,
        firstName: profile.given_name,
        lastName: profile.family_name,
      });
      await this.userRepo.save(user);
    }

    return user; // Gibt den User zurück
  }

  // JWT für den Benutzer generieren
  async login(user: UsersEntity): Promise<any> {
    const payload = { googleId: user.googleId, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1h' }), // JWT mit Ablaufzeit von 1 Stunde
    };
  }
}
