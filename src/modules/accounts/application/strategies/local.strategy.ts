import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';

// helpers
import { MessagesHelper } from 'src/common/helpers/messages.helper';

// services
import { SessionsService } from 'src/modules/accounts/application/services/sessions.service';

// entities
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly sessionsService: SessionsService) {
    super({ usernameField: 'email' });
  }

  public async validate(email: string, password: string): Promise<UserEntity> {
    const user = await this.sessionsService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException(MessagesHelper.EMAIL_OR_PASSWORD_INVALID);
    }

    return user;
  }
}
