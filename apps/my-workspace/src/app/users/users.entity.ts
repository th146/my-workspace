import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Role {
  Admin = 'admin',
  User = 'user',
}

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vorname: string; // sicherstellen, dass es hier steht

  @Column()
  googleId: string; // sicherstellen, dass es hier steht

  @Column()
  nachname: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;
}
