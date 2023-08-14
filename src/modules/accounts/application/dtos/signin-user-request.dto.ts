import { IsEmail, IsNotEmpty } from 'class-validator';

// helpers
import { MessagesHelper } from 'src/common/helpers/messages.helper';

export class SignInUserRequestDto {
  @IsNotEmpty()
  @IsEmail(
    {},
    {
      message: MessagesHelper.EMAIL_INVALID,
    },
  )
  public readonly email: string;

  @IsNotEmpty()
  public readonly password: string;
}
