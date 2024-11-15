import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role, UsersEntity } from './users.entity';  

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  
  async create(userData: { name: string; password: string; role?: Role }) {
    const role = userData.role || Role.User;

    
    const newUser = this.userRepository.create({
      name: userData.name,
      password: userData.password,  
      role,
    });

    return await this.userRepository.save(newUser);
  }

  
  async findOne(name: string): Promise<UsersEntity | undefined> {
    return this.userRepository.findOne({ where: { name } });
  }


  
  async isAdmin(name: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { name: name } });
    return user?.role === Role.Admin;
  }

  
  async findRole(name: string): Promise<Role | undefined> {
    const user = await this.userRepository.findOne({ where: { name } });
    return user?.role;
  }
}
