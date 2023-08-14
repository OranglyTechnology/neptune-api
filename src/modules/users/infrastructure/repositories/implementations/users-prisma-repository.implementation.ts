import { Injectable } from '@nestjs/common';

// dtos
import { CreateUserDto } from 'src/modules/users/application/dtos/create-user.dto';
import { UpdateUserDto } from 'src/modules/users/application/dtos/update-user.dto';

// services
import { PrismaService } from 'src/modules/prisma/application/services/prisma.service';

// repositories
import { IUsersRepository } from 'src/modules/users/domain/repositories/users.repository.interface';

// entities
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';

@Injectable()
export class UsersPrismaRepositoryImpl implements IUsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAll(): Promise<UserEntity[]> {
    return this.prismaService.user.findMany();
  }

  public async findById(id: string): Promise<UserEntity> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  public async create(data: CreateUserDto): Promise<UserEntity> {
    return this.prismaService.user.create({
      data,
    });
  }

  public async update(data: UpdateUserDto): Promise<UserEntity> {
    return this.prismaService.user.update({
      where: { id: data.id },
      data,
    });
  }

  public async delete(id: string): Promise<void> {
    await this.prismaService.user.delete({
      where: { id },
    });
  }
}
