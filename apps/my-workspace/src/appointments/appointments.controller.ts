import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Appointment } from '@my-workspace/api-interfaces';
import { AppointmentsService } from './appointments.service';
import { Roles } from '../auth/roles/roles.decorator';

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

  @Roles('admin')
  @Delete(':id')
  async deleteAppointment(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.appointmentService.deleteAppointment(id);
    } catch (e) {
      throw new HttpException(e?.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('create-appointment')
  async createAppointment(@Body() appointmentData: Appointment): Promise<Appointment> {
    try {
      return await this.appointmentService.createAppointment(appointmentData);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
  

}