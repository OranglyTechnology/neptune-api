// dtos
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { UpdateUserDto } from '../../application/dtos/update-user.dto';

// entities
import { UserEntity } from '../entities/user.entity';

export interface IUsersRepository {
  create(data: CreateUserDto): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  findById(id: string): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
  update(data: UpdateUserDto): Promise<UserEntity>;
  delete(id: string): Promise<void>;
}

// tokens
export const USERS_REPOSITORY_TOKEN = 'users-repository-token';
