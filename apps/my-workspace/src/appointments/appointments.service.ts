import { Injectable } from '@nestjs/common';
import { Appointment } from '@my-workspace/api-interfaces';
import { isTimeInInterval } from '@my-workspace/shared'
import { openingHoursPerBranch } from "../branches/branches.controller";
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

    if (candidate === null) {
      throw new Error(`no appointment with id ${id} found.`);
    }

    const patchedAppointment: Appointment = {...candidate, ...appointment};
    const start = openingHoursPerBranch[patchedAppointment.branch].openingHoursStart;
    const end = openingHoursPerBranch[patchedAppointment.branch].openingHoursEnd;

    if (false === isTimeInInterval(patchedAppointment.time, start, end)) {
      throw new Error(`The time ${patchedAppointment.time} of the appointment is not within the opening hours (${start} - ${end})`);
    }
    await this.appointmentsRepo.save(patchedAppointment)
    return patchedAppointment;
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