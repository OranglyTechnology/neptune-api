import { Injectable, NotFoundException } from '@nestjs/common';

// dtos
import { UpdateUserDto } from 'src/modules/users/application/dtos/update-user.dto';

// repositories
import { UsersService } from 'src/modules/users/application/services/users.service';

// entities
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly usersService: UsersService) {}

  public async execute(data: UpdateUserDto): Promise<UserEntity> {
    const findUser = await this.usersService.findById(data.id);

    if (!findUser) {
      throw new NotFoundException();
    }

    findUser.email = data.email;
    findUser.password = data.password;

    return this.usersService.update(findUser);
  }
}
