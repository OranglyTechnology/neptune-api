import { Injectable, NotFoundException } from '@nestjs/common';

// services
import { UsersService } from 'src/modules/users/application/services/users.service';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly usersService: UsersService) {}

  public async execute(id: string): Promise<void> {
    const findUser = await this.usersService.findById(id);

    if (!findUser) {
      throw new NotFoundException();
    }

    await this.usersService.delete(id);
  }
}
