export interface Appointment {
  id?: number;
  assignment?: string;
  branch?: string;
  vehicleOwner?: string;
  vehicleRegNo?: string;
  status?: string;
  date?: string;
  time?: string;
}

export interface OpeningHours {
  openingHoursStart: string;
  openingHoursEnd: string;
}

export interface OpeningHoursPerBranch {
  [key: string]: OpeningHours;
}

export interface User {
  id?: number;
  googleId?: string,
  vorname?: string;
  nachname?: string;
  role?: Role;

}

export enum Role {
  Admin = 'admin',
  User = 'user',
}