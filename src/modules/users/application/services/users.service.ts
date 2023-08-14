import { Injectable, Inject } from '@nestjs/common';

// dtos
import { CreateUserDto } from 'src/modules/users/application/dtos/create-user.dto';
import { UpdateUserDto } from 'src/modules/users/application/dtos/update-user.dto';

// repositories
import {
  IUsersRepository,
  USERS_REPOSITORY_TOKEN,
} from 'src/modules/users/domain/repositories/users.repository.interface';

// entities
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY_TOKEN)
    private readonly usersRepository: IUsersRepository,
  ) {}

  public async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.findAll();
  }

  public async findById(id: string): Promise<UserEntity> {
    return this.usersRepository.findById(id);
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findByEmail(email);
  }

  public async create(data: CreateUserDto): Promise<UserEntity> {
    return this.usersRepository.create(data);
  }

  public async update(data: UpdateUserDto): Promise<UserEntity> {
    return this.usersRepository.update(data);
  }

  public async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
