// entities
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';

export class SignInUserResponseDto {
  public readonly accessToken: string;

  public readonly user: UserEntity;
}
