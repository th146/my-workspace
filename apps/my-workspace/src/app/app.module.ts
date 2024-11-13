import { Module } from '@nestjs/common';
import { AppointmentsController } from '../appointments/appointments.controller';
import { AppointmentsService } from '../appointments/appointments.service';
import { BranchesController } from '../branches/branches.controller'; // Falls noch nicht vorhanden
import { BranchesService } from '../branches/branches.service'; // Falls noch nicht vorhanden
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsEntity } from '../appointments/appointments.entity';
import { BranchEntity } from '../branches/branches.entity'; // Falls du eine BranchesEntity hast
import { getConfig } from './config/config';

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
    TypeOrmModule.forFeature([AppointmentsEntity, BranchEntity]), // Füge BranchesEntity hinzu
  ],
  controllers: [AppointmentsController, BranchesController], // Füge BranchesController hinzu
  providers: [AppointmentsService, BranchesService], // Füge BranchesService hinzu
})
export class AppModule {}
