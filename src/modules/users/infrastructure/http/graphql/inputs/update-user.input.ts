import { InputType, Field } from '@nestjs/graphql';

// dtos
import { UpdateUserDto } from '../../../../application/dtos/update-user.dto';

@InputType()
export class UpdateUserInput extends UpdateUserDto {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
