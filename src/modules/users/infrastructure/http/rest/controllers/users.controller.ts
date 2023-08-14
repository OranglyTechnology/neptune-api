import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
} from '@nestjs/common';

// dtos
import { CreateUserDto } from 'src/modules/users/application/dtos/create-user.dto';

// usecases
import { CreateUserUseCase } from 'src/modules/users/application/usecases/create-user.usecase';
import { ListUsersUseCase } from 'src/modules/users/application/usecases/list-users.usecase';

// entities
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  public async index(): Promise<UserEntity[]> {
    return this.listUsersUseCase.execute();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  public async store(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    return this.createUserUseCase.execute(createUserDto);
  }
}
