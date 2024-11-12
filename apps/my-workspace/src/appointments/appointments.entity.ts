import { Appointment } from "@my-workspace/api-interfaces";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AppointmentsEntity implements Appointment {
  @Column()
  assignment: string;
  @Column()
  owner: number;
  @Column()
  branch: string;
  @Column()
  date: string;
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  status: string;
  @Column()
  time: string;
  @Column()
  vehicleOwner: string;
  @Column()
  vehicleRegNo: string;

}
