import { registerAs } from '@nestjs/config';

export const appConfigFactory = registerAs('app', () => ({
  domain: process.env.DOMAIN,
  payloadSize: '20mb',
  platformName: process.env.PLATFORM_NAME,
}));
