import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { ConfigType } from '@nestjs/config';
import { jwtConfigFactory } from '@Config';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: (config: ConfigType<typeof jwtConfigFactory>) => ({
        secret: config.secret,
        signOptions: config.signOptions,
      }),
      inject: [jwtConfigFactory.KEY],
    }),
  ],

  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
