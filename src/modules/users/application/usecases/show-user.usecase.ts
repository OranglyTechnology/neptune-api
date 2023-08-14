import { Injectable, NotFoundException } from '@nestjs/common';

// repositories
import { UsersService } from 'src/modules/users/application/services/users.service';

// entities
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';

@Injectable()
export class ShowUserUseCase {
  constructor(private readonly usersService: UsersService) {}

  public async execute(id: string): Promise<UserEntity> {
    const findUser = await this.usersService.findById(id);

    if (!findUser) {
      throw new NotFoundException();
    }

    return this.usersService.findById(id);
  }
}
