import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@my-workspace/api-interfaces';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() userData: User): Promise<User> {
    return this.usersService.createUser(userData);
  }
}
