import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as configs from '@Config';
import { validateEnvironmentVariables } from './utils';
import * as providers from './providers';
import { JwtStrategy } from './strategies';

const commonProviders = [...Object.values(providers), JwtStrategy];

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: Object.values(configs),
      validate: validateEnvironmentVariables,
    }),
  ],
  providers: [...commonProviders],
  exports: commonProviders,
})
export class CommonModule {}
