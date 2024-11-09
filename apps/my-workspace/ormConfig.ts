import { DataSource } from 'typeorm';
import { AppointmentsEntity } from './src/appointments/appointments.entity';

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'root',
    database: 'newDB',
    entities: [AppointmentsEntity],
    synchronize: true,
   })