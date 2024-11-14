import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConfig } from './config/config';
import { UsersModule } from './users/users.module'; 
import { AppointmentsModule } from '../appointments/appointments.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { BranchesModule } from '../branches/branches.module';





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
    AppointmentsModule, 
    UsersModule,
    AuthModule,
    BranchesModule  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
