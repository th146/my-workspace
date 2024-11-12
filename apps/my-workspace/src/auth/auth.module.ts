import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { AuthService } from './auth.service';
import { UsersModule } from '../app/users/users.module';  
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PassportModule, JwtModule.register({
    secret: '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 ', 
    signOptions: { expiresIn: '1h' },
  }), UsersModule],  
  providers: [GoogleStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
