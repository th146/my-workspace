import { DataSource } from 'typeorm';
import { AppointmentsEntity } from './src/appointments/appointments.entity';



export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',  // oder 'postgres_local_db', je nach Netzwerkkonfiguration
  port: 5432,
  username: 'root',  // entsprechend der Umgebungsvariable POSTGRES_USER
  password: 'root',  // entsprechend der Umgebungsvariable POSTGRES_PASSWORD
  database: 'newDB', // entsprechend der Umgebungsvariable POSTGRES_DB
  synchronize: true,  // Ermöglicht die automatische Erstellung der Tabellen, falls erforderlich
  logging: false,
  entities: [ AppointmentsEntity ],
});
