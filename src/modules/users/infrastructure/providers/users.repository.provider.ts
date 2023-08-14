import { Injectable, Provider } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// constants
import { DataSource } from 'src/common/constants/datasource.contants';

// datasource
import { PrismaService } from 'src/modules/prisma/application/services/prisma.service';

// repositories
import { UsersTypeOrmRepositoryImpl } from '../repositories/implementations/users-typeorm-repository.implementation';
import { UsersPrismaRepositoryImpl } from 'src/modules/users/infrastructure/repositories/implementations/users-prisma-repository.implementation';
import { UsersInMemoryRepositoryImpl } from 'src/modules/users/infrastructure/repositories/implementations/users-in-memory-repository.implementation';

// token
import { USERS_REPOSITORY_TOKEN } from 'src/modules/users/domain/repositories/users.repository.interface';
import { UserEntity } from '../../domain/entities/user.entity';

export function provideUsersRepository(): Provider[] {
  return [
    {
      provide: USERS_REPOSITORY_TOKEN,
      useFactory: async (
        dependenciesProvider: UsersRepositoryDependenciesProvider,
      ) => provideUsersRepositoryFactory(dependenciesProvider),
      inject: [UsersRepositoryDependenciesProvider],
    },
    UsersRepositoryDependenciesProvider,
  ];
}

async function provideUsersRepositoryFactory(
  dependenciesProvider: UsersRepositoryDependenciesProvider,
) {
  switch (process.env.DATABASE_DATASOURCE) {
    case DataSource.TYPEORM:
      return new UsersTypeOrmRepositoryImpl(
        dependenciesProvider.typeOrmRepository,
      );
    case DataSource.PRISMA:
      return new UsersPrismaRepositoryImpl(dependenciesProvider.prismaService);
    case DataSource.MEMORY:
    default:
      return new UsersInMemoryRepositoryImpl();
  }
}

@Injectable()
export class UsersRepositoryDependenciesProvider {
  constructor(
    public prismaService: PrismaService,

    @InjectRepository(UserEntity)
    public typeOrmRepository: Repository<UserEntity>,
  ) {}
}
