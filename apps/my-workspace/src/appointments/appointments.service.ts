import { Injectable } from '@nestjs/common';
import { Appointment } from '@my-workspace/api-interfaces';
import { InjectRepository } from "@nestjs/typeorm";
import { AppointmentsEntity } from "./appointments.entity";
import { Repository } from "typeorm";

@Injectable()
export class AppointmentsService {
  constructor(@InjectRepository(AppointmentsEntity) private readonly appointmentsRepo: Repository<Appointment>) {
  }

  async getAll(): Promise<Appointment[]> {
    return this.appointmentsRepo.find()
  }

  async getById(id: number): Promise<Appointment | null> {
    return this.appointmentsRepo.findOne({where: {id}})
  }

  async updateAppointment(id: number, appointment: Partial<Appointment>): Promise<Appointment> {
    const candidate = await this.getById(id);
  
    if (!candidate) throw new Error(`No appointment with id ${id} found.`);

    return this.appointmentsRepo.save({ ...candidate, ...appointment });
  }

  // Backend-Methode für das Löschen eines Termins
  async deleteAppointment(id: number): Promise<void> {
    const candidate = await this.getById(id);

    if (!candidate) {
      throw new Error(`Appointment with id ${id} not found`);
    }

    await this.appointmentsRepo.remove(candidate); // Löscht den Termin aus der DB
  }
  
  async createAppointment(appointmentData: Appointment): Promise<Appointment> {
    const newAppointment = this.appointmentsRepo.create(appointmentData);
    return this.appointmentsRepo.save(newAppointment);
  }
  
}