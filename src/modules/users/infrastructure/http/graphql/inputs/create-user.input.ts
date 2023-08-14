import { InputType, Field } from '@nestjs/graphql';

// dtos
import { CreateUserDto } from 'src/modules/users/application/dtos/create-user.dto';

@InputType()
export class CreateUserInput extends CreateUserDto {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
