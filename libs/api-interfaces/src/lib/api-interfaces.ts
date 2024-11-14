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

// user.interface.ts
export interface User {
  id?: number;  // ID wird beim Erstellen möglicherweise nicht übergeben, daher optional
  name?: string;
  password?: string;  // Passwort ist erforderlich für den Login
  role?: 'admin' | 'user';  // Du kannst den Role-Typ auf die zwei vordefinierten Rollen beschränken
}


export enum Role {
  Admin = 'admin',
  User = 'user',
}

export interface Branch {
  name: string;
  openingHoursStart: string;
  openingHoursEnd: string;
}