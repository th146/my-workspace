import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { Repository } from "typeorm";
import { User } from '@my-workspace/api-interfaces';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly usersRepo: Repository<User>) {}

  async createUser(userData: User): Promise<User> {
    const newUser = this.usersRepo.create(userData);
    return this.usersRepo.save(newUser);
  }


}