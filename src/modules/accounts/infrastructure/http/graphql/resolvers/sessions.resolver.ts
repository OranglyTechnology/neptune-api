import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

// guards
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard';

// usecases
import { AuthenticateUserUseCase } from 'src/modules/accounts/application/usecases/authenticate-user.usecases';

// objects
import { SignInUserResponseObject } from 'src/modules/accounts/infrastructure/http/graphql/objects/signin-user-response.object';

// inputs
import { SignInUserRequestInput } from 'src/modules/accounts/infrastructure/http/graphql/inputs/signin-user-request.input';
import { SignUpUserRequestInput } from 'src/modules/accounts/infrastructure/http/graphql/inputs/signup-user-request.input';

// entities
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';

@Resolver()
export class SessionsResolver {
  constructor(
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  @Mutation(() => SignInUserResponseObject)
  @UseGuards(GqlAuthGuard)
  public async signIn(
    @Args('signInUserRequestInput')
    signInUserRequestInput: SignInUserRequestInput,
    @Context() context,
  ): Promise<SignInUserResponseObject> {
    return this.authenticateUserUseCase.execute(context.user);
  }

  // @Mutation(() => UserEntity)
  // public async signUp(
  //   @Args('signUpUserRequestInput')
  //   signUpUserRequestInput: SignUpUserRequestInput,
  // ): Promise<void> {}
}
