import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConfig } from './config/config';
import { UsersModule } from './users/users.module'; // Importiere das UsersModule
import { AppointmentsModule } from '../appointments/appointments.module';
import { AuthModule } from '../auth/auth.module';


const config = getConfig();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.get('dbHost'),
      port: config.get('dbPort'),
      username: config.get('dbUser'),
      password: config.get('dbPassword'),
      database: config.get('dbName'),
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule, 
    AppointmentsModule, 
    AuthModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
