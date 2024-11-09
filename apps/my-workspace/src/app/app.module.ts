import { Module } from '@nestjs/common';
import { AppointmentsController } from "../appointments/appointments.controller";
import { AppointmentsService } from "../appointments/appointments.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppointmentsEntity } from "../appointments/appointments.entity";
import { getConfig } from './config/config';



const config = getConfig()

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: config.get('dbHost'),
    port: config.get('dbPort'),
    username: config.get('dbUser'),
    password: config.get('dbPassword'),
    database: config.get('dbName'),
    autoLoadEntities: true,
    synchronize: true,
  }),
    TypeOrmModule.forFeature([AppointmentsEntity]),
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppModule {}