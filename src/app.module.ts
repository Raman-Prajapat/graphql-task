import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users';
import { CommonModule } from '@Common';
import { ChatModule } from './chat/chat.module';
import { dbCredential } from './configs/db.config';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: dbCredential.DIALECT,
      host: dbCredential.HOST,
      port: dbCredential.PORT,
      username: dbCredential.USERNAME,
      password: dbCredential.PASSWORD,
      database: dbCredential.DATABASE,
      models: [User],
      autoLoadModels: true,
      sync: {
        force: true,
      },
      schema: 'public',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
      formatError: (error) => {
        const graphQLFormattedError = {
          message: JSON.stringify(error.extensions?.exception) || error.message,
          code: error.extensions?.code || 'SERVER_ERROR',
          name: error.extensions?.exception || error?.message,
        };
        return graphQLFormattedError;
      },
    }),
    UsersModule,
    CommonModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
