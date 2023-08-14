import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

// dtos
import { CreateUserDto } from 'src/modules/users/application/dtos/create-user.dto';
import { UpdateUserDto } from 'src/modules/users/application/dtos/update-user.dto';

// repositories
import { IUsersRepository } from 'src/modules/users/domain/repositories/users.repository.interface';

// entities
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';

@Injectable()
export class UsersTypeOrmRepositoryImpl implements IUsersRepository {
  constructor(private readonly usersRepository: Repository<UserEntity>) {}

  public async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.usersRepository.create(createUserDto);

    await this.usersRepository.save(user);

    return user;
  }

  public async findAll(): Promise<UserEntity[]> {
    const users = await this.usersRepository.find();

    return users;
  }

  public async findById(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async update(data: UpdateUserDto): Promise<UserEntity> {
    return this.usersRepository.save(data);
  }

  public async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
