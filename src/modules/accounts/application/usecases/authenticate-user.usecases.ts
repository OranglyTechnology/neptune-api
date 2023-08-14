import { Injectable } from '@nestjs/common';

// dtos
import { SignInUserRequestDto } from 'src/modules/accounts/application/dtos/signin-user-request.dto';
import { SignInUserResponseDto } from 'src/modules/accounts/application/dtos/signin-user-response.dto';

// services
import { SessionsService } from 'src/modules/accounts/application/services/sessions.service';
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';

@Injectable()
export class AuthenticateUserUseCase {
  constructor(private readonly sessionsService: SessionsService) {}

  public async execute(user: UserEntity): Promise<SignInUserResponseDto> {
    delete user.password;

    return this.sessionsService.signIn(user);
  }
}
