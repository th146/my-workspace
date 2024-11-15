import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role, UsersEntity } from './users.entity';  // Stelle sicher, dass 'Role' korrekt definiert ist

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  // Benutzer erstellen
  async create(userData: { name: string; password: string; role?: Role }) {
    const role = userData.role || Role.User;

    // Benutzer erstellen ohne Passwort zu hashen
    const newUser = this.userRepository.create({
      name: userData.name,
      password: userData.password,  // Passwort wird direkt gespeichert
      role,
    });

    return await this.userRepository.save(newUser);
  }

  // Benutzer anhand des Benutzernamens finden
  async findOne(name: string): Promise<UsersEntity | undefined> {
    return this.userRepository.findOne({ where: { name } });
  }


  // Überprüfen, ob der Benutzer ein Admin ist
  async isAdmin(name: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { name: name } });
    return user?.role === Role.Admin;
  }

  // Rolle des Benutzers finden
  async findRole(name: string): Promise<Role | undefined> {
    const user = await this.userRepository.findOne({ where: { name } });
    return user?.role;
  }
}
