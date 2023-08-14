import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail(
    {},
    {
      message: 'E-mail inválido',
    },
  )
  public readonly email: string;

  @IsNotEmpty()
  public readonly password: string;
}
