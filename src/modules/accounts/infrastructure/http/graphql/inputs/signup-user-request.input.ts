import { Field, InputType } from '@nestjs/graphql';

// dtos
import { SignUpUserRequestDto } from 'src/modules/accounts/application/dtos/signup-user-request.dto';

@InputType()
export class SignUpUserRequestInput extends SignUpUserRequestDto {
  @Field()
  email: string;

  @Field()
  password: string;
}
