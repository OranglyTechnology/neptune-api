import { Injectable } from '@nestjs/common';

// helpers
import { compareHashSync } from 'src/common/helpers/bcrypt-hash.helper';

// dtos
import { SignInUserResponseDto } from 'src/modules/accounts/application/dtos/signin-user-response.dto';

// services
import { UsersService } from 'src/modules/users/application/services/users.service';
import { TokensService } from 'src/modules/tokens/application/services/tokens.service';

// entities
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';

@Injectable()
export class SessionsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
  ) {}

  public async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.usersService.findByEmail(email);

    const isPasswordValid = compareHashSync(password, user.password);

    if (user && isPasswordValid) {
      delete user.password;

      return user;
    }

    return null;
  }

  public async signIn(user: UserEntity): Promise<SignInUserResponseDto> {
    const accessToken = await this.tokensService.createAccessToken(user);

    return {
      accessToken,
      user,
    };
  }
}
