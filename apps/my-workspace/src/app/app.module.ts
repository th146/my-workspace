import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentsController } from '../appointments/appointments.controller';
import { AppointmentsService } from '../appointments/appointments.service';

@Module({
  imports: [],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppModule {}
