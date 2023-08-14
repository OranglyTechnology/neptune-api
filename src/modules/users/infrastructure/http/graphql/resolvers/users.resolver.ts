import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Context,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

// inputs
import { CreateUserInput } from 'src/modules/users/infrastructure/http/graphql/inputs/create-user.input';
import { UpdateUserInput } from 'src/modules/users/infrastructure/http/graphql/inputs/update-user.input';

// guards
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

// entities
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';

// usecases
import { CreateUserUseCase } from 'src/modules/users/application/usecases/create-user.usecase';
import { ListUsersUseCase } from 'src/modules/users/application/usecases/list-users.usecase';
import { ShowUserUseCase } from 'src/modules/users/application/usecases/show-user.usecase';
import { UpdateUserUseCase } from 'src/modules/users/application/usecases/update-user.usecase';
import { DeleteUserUseCase } from 'src/modules/users/application/usecases/delete-user.usecase';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly showUserUseCase: ShowUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Query(() => [UserEntity], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  @ResolveField('password', () => String, { nullable: true })
  public async getAllUsers(@Context() context): Promise<UserEntity[]> {
    return this.listUsersUseCase.execute();
  }

  @Query(() => UserEntity, { name: 'user' })
  @ResolveField('password', () => String, { nullable: true })
  public async getUserById(@Args('id') id: string): Promise<UserEntity> {
    return this.showUserUseCase.execute(id);
  }

  @Mutation(() => UserEntity, { name: 'create' })
  @ResolveField('password', () => String, { nullable: true })
  public async createUser(
    @Args('user') createUserInput: CreateUserInput,
  ): Promise<UserEntity> {
    return this.createUserUseCase.execute(createUserInput);
  }

  @Mutation(() => UserEntity, { name: 'update' })
  @ResolveField('password', () => String, { nullable: true })
  public async updateUser(
    @Args('user') updateUserInput: UpdateUserInput,
  ): Promise<UserEntity> {
    return this.updateUserUseCase.execute(updateUserInput);
  }

  @Mutation(() => String, { name: 'delete' })
  public async deleteUser(@Args('id') id: string): Promise<string> {
    await this.deleteUserUseCase.execute(id);

    return `Usuário ${id} excluído com sucesso`;
  }
}
