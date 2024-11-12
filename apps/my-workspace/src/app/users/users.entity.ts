import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Role {
  Admin = 'admin',
  User = 'user',
}

@Entity()
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string; 

  @Column()
  googleId: string; 

  @Column()
  lastName: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;
}

