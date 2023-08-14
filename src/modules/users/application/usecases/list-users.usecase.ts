import { Injectable } from '@nestjs/common';

// services
import { UsersService } from 'src/modules/users/application/services/users.service';

// entities
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';

@Injectable()
export class ListUsersUseCase {
  constructor(private readonly usersService: UsersService) {}

  public async execute(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }
}
