import { Body, Controller, Get, Post, Patch, Param, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { Appointment } from '@my-workspace/api-interfaces';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentService: AppointmentsService) {}

  @Get()
  getAllApointments(): Promise<Appointment[]> {
    return this.appointmentService.getAll();
  }

  @Get(':id')
  async getAppointmentById(@Param('id', ParseIntPipe) id: number): Promise<Appointment> {
    const candidate = await this.appointmentService.getById(id);
    if (!candidate) {
      throw new HttpException('Appointment not found', HttpStatus.NOT_FOUND);
    }
    return candidate;
  }

  @Post('create-appointment')
  async createAppointment(@Body() appointmentData: Appointment): Promise<Appointment> {
    try {
      return await this.appointmentService.createAppointment(appointmentData);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async updateAppointment(
    @Param('id', ParseIntPipe) id: number,
    @Body() appointment: Partial<Appointment>
  ): Promise<Appointment> {
    try {
      return await this.appointmentService.updateAppointment(id, appointment);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }
}
