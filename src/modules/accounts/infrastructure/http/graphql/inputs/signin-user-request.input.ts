import { Field, InputType } from '@nestjs/graphql';

// dtos
import { SignInUserRequestDto } from 'src/modules/accounts/application/dtos/signin-user-request.dto';

@InputType()
export class SignInUserRequestInput extends SignInUserRequestDto {
  @Field()
  email: string;

  @Field()
  password: string;
}
