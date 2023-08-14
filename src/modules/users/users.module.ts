import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// datasource
import { PrismaService } from 'src/modules/prisma/application/services/prisma.service';

// providers
import { provideUsersRepository } from 'src/modules/users/infrastructure/providers/users.repository.provider';

// services
import { UsersService } from 'src/modules/users/application/services/users.service';

// usecases
import { ListUsersUseCase } from 'src/modules/users/application/usecases/list-users.usecase';
import { CreateUserUseCase } from 'src/modules/users/application/usecases/create-user.usecase';
import { UpdateUserUseCase } from 'src/modules/users/application/usecases/update-user.usecase';
import { ShowUserUseCase } from 'src/modules/users/application/usecases/show-user.usecase';
import { DeleteUserUseCase } from 'src/modules/users/application/usecases/delete-user.usecase';

// resolvers
import { UsersResolver } from 'src/modules/users/infrastructure/http/graphql/resolvers/users.resolver';

// controllers
import { UsersController } from 'src/modules/users/infrastructure/http/rest/controllers/users.controller';

// entities
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    //services
    PrismaService,

    // repositories
    ...provideUsersRepository(),

    // services
    UsersService,

    // usecases
    ListUsersUseCase,
    CreateUserUseCase,
    ShowUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,

    // resolvers
    UsersResolver,
  ],
  exports: [
    // services
    UsersService,
  ],
})
export class UsersModule {}
