// dtos
import { UpdateUserDto } from 'src/modules/users/application/dtos/update-user.dto';

// repositories
import { IUsersRepository } from '../../../domain/repositories/users.repository.interface';

// entities
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';

export class UsersInMemoryRepositoryImpl implements IUsersRepository {
  private users: UserEntity[] = [];

  public async findAll() {
    return this.users;
  }

  public async findById(id: string): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }

  public async create(user: UserEntity) {
    this.users.push(user);
    return user;
  }

  public async update(data: UpdateUserDto): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }

  public async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
