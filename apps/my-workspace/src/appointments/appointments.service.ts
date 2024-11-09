import { Appointment } from "@my-workspace/api-interfaces";
import { Injectable } from "@nestjs/common";
import { APPOINTMENTS } from "./appointments.mock";
import { openingHoursPerBranch } from "../branches/branches.controller";
import { isTimeInInterval } from "@my-workspace/shared";

@Injectable()
export class AppointmentsService {
  private appointments: Appointment[] = APPOINTMENTS;

  getAll(): Appointment[] {
    return this.appointments;
  }

  getById(id: number): Appointment | undefined {
    return this.appointments.find(a => a.id === id);
  }

  updateAppointment(id: number, appointment: Partial<Appointment>): Appointment {
    const canidate: Appointment | undefined = this.appointments.find((a) => a.id === id);
    if (canidate === undefined) {
        throw new Error(`no appointment with id ${id} found.`)
    }

    const patchedAppointment: Appointment = { ...canidate, ...appointment };
    const start = openingHoursPerBranch[patchedAppointment.branch].openingHoursStart;
    const end = openingHoursPerBranch[patchedAppointment.branch].openingHoursEnd;

    if (false === isTimeInInterval(patchedAppointment.time, start, end)) {
        throw new Error(`The time ${patchedAppointment.time} of the appointment is not within the opening hours (${start} - ${end})`);
      }

    this.appointments = this.appointments.map((a) =>
        a.id === id ? patchedAppointment : a
      );
      return patchedAppointment;

  }
}