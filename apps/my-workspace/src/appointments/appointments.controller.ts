import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Appointment } from '@my-workspace/api-interfaces';
import { AppointmentsService } from './appointments.service';

@Controller('appointments')
export class AppointmentsController {

  constructor(private readonly appointmentService: AppointmentsService) { }

  @Get()
  getAllApointments(): Promise<Appointment[]> {
    return this.appointmentService.getAll();
  }

  @Get(':id')
  async getAppointmentById(@Param('id', ParseIntPipe) id: number) {
    const canidate = await this.appointmentService.getById(id);

    if (canidate === undefined) {
      throw new HttpException('', HttpStatus.NOT_FOUND)
    }

    return canidate
  }

  @Post('create-appointment')
  createAppointment(@Body() createAppointmentDto: Appointment): Promise<Appointment> {
    return this.appointmentService.createAppointment(createAppointmentDto);
  }

  @Patch(':id')
  async updateAppointment(
    @Param('id', ParseIntPipe) id: number,
    @Body() appointment: Partial<Appointment>
  ): Promise<Appointment> {
    try {
      return this.appointmentService.updateAppointment(id, appointment)
    } catch (e) {
      throw new HttpException(e?.message, HttpStatus.NOT_FOUND);
    }
  }


}