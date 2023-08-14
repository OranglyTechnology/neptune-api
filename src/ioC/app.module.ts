import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'node:path';

// config
import typeOrmConfig, { entitiesDir } from '../config/typeorm.config';

// datasource
import { PrismaModule } from '../modules/prisma/prisma.module';

// modules
import { UsersModule } from 'src/modules/users/users.module';
import { AccountsModule } from 'src/modules/accounts/accounts.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({ load: [typeOrmConfig] })],
      useFactory: (
        configDatabase: ConfigType<typeof typeOrmConfig>,
      ): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: configDatabase.host,
        port: configDatabase.port,
        username: configDatabase.username,
        password: configDatabase.password,
        database: configDatabase.database,
        entities: [entitiesDir],
        synchronize: true,
        autoLoadEntities: true,
        uuidExtension: 'uuid-ossp',
      }),
      inject: [typeOrmConfig.KEY],
    }),
    PrismaModule,
    UsersModule,
    AccountsModule,
  ],
  providers: [],
})
export class AppModule {}
