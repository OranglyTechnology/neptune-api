import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

// modules
import { UsersModule } from 'src/modules/users/users.module';
import { TokensModule } from 'src/modules/tokens/tokens.module';

// strategies
import { LocalStrategy } from 'src/modules/accounts/application/strategies/local.strategy';
import { JwtStrategy } from 'src/modules/accounts/application/strategies/jwt.strategy';

// usecases
import { AuthenticateUserUseCase } from 'src/modules/accounts/application/usecases/authenticate-user.usecases';

// services
import { SessionsService } from 'src/modules/accounts/application/services/sessions.service';

// resolvers
import { SessionsResolver } from 'src/modules/accounts/infrastructure/http/graphql/resolvers/sessions.resolver';

@Module({
  imports: [
    PassportModule,

    // modules
    UsersModule,
    TokensModule,
  ],
  providers: [
    // strategies
    LocalStrategy,
    JwtStrategy,

    // services,
    SessionsService,

    // usecases
    AuthenticateUserUseCase,

    // resolvers
    SessionsResolver,
  ],
})
export class AccountsModule {}
