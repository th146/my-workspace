import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { Appointment } from 'libs/api-interfaces/src/lib/api-interfaces';

@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly appointmentService: AppointmentsService) { }

    @Get()
    getAll(): Appointment[] {
      return this.appointmentService.getAll();
    }
    
    @Get(':id')
    getAppointmentById(@Param('id', ParseIntPipe) id: number) {
        const canidate = this.appointmentService.getById(id);

        if (canidate === undefined) {
            throw new HttpException('', HttpStatus.NOT_FOUND)
    }

        return canidate
    }
}
