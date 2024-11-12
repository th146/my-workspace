import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from './auth.service'; // AuthService importieren

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: '350108708808-pnfb2ib13lfevfitcrq6g5eftjifscer.apps.googleusercontent.com',
      clientSecret: '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 ',
      callbackURL: 'http://localhost:3000/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const user = await this.authService.validateGoogleUser(profile);
    return user;
  }
}
