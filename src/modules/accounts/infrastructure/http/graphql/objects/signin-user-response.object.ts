import { Field, ObjectType } from '@nestjs/graphql';

// dtos
import { SignInUserResponseDto } from 'src/modules/accounts/application/dtos/signin-user-response.dto';

// entities
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';

@ObjectType()
export class SignInUserResponseObject extends SignInUserResponseDto {
  @Field()
  accessToken: string;

  @Field(() => UserEntity)
  user: UserEntity;
}
