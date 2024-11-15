import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('branches')
export class BranchEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  openingHoursStart: string;

  @Column()
  openingHoursEnd: string;
}
