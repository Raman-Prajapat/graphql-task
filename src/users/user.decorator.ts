import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data, req) => req);

export const getContext = (req: any) => {
  const userId = req['args']['2']['req']['user'];
  return {
    user: userId,
  };
};
