import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { User } from '@my-workspace/api-interfaces';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UsersEntity) private readonly usersRepo: Repository<UsersEntity>) {}

  async createUser(userData: User): Promise<User> {
    const newUser = this.usersRepo.create(userData);
    return this.usersRepo.save(newUser);
  }
}
