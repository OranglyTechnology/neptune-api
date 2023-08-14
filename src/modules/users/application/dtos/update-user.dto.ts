import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

// dtos
import { CreateUserDto } from 'src/modules/users/application/dtos/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  public readonly id: string;
}
