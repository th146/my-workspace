import { UsersEntity } from './src/app/users/users.entity';
import { DataSource } from 'typeorm';
import { AppointmentsEntity } from './src/appointments/appointments.entity';



export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',  
  port: 5432,
  username: 'postgres',  
  password: 'root',  
  database: 'newDB', 
  synchronize: true,  
  logging: false,
  entities: [ AppointmentsEntity, UsersEntity ],
});
