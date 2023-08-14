import { Injectable } from '@nestjs/common';

// helpers
import { generateHashSync } from 'src/common/helpers/bcrypt-hash.helper';

// dtos
import { CreateUserDto } from 'src/modules/users/application/dtos/create-user.dto';

// services
import { UsersService } from 'src/modules/users/application/services/users.service';

// entities
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly usersService: UsersService) {}

  public async execute(createUserDto: CreateUserDto): Promise<UserEntity> {
    const data: CreateUserDto = {
      ...createUserDto,
      password: generateHashSync(createUserDto.password),
    };

    return this.usersService.create(data);
  }
}
