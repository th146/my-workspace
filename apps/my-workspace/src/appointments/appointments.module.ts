import { CommonModule } from '@angular/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsEntity } from './appointments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentsEntity])], 
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
