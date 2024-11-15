import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt'; // Für JWT-basierte Authentifizierung
import { PassportModule } from '@nestjs/passport'; // Für Passport.js, eine Authentifizierungsbibliothek
import { JwtStrategy } from './jwt.strategy'; // Deine JWT-Strategie für das JWT-Handling
import { UsersModule } from '../app/users/users.module';
import { AuthService } from './roles/auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../app/users/users.service';

@Module({
  imports: [
    UsersModule, // Importiere das UsersModule, um auf den UsersService zuzugreifen
    PassportModule.register({ defaultStrategy: 'jwt' }), // Registriere die Passport-Strategie
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret', // JWT-Geheimnis
      signOptions: {
        expiresIn: '60m', // Token-Ablaufzeit
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // Stelle sicher, dass JwtStrategy und AuthService hier auch im Provider-Array sind
  exports: [AuthService], // Stelle sicher, dass AuthService exportiert wird, falls du es woanders verwenden musst
})
export class AuthModule {}
