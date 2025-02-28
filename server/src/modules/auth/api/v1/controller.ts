import express, { Request, Response } from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { celebrate, Segments } from 'celebrate';
import { toSuccess } from '@/middleware';
import { loginSchema, refreshTokenSchema, registerSchema } from './schema';
import * as service from './service';

const auth = express.Router();

auth.post(
  '/login',
  celebrate({ [Segments.BODY]: loginSchema }),
  tracedAsyncHandler(async function login(req: Request, res: Response) {
    const data = await service.login(req.body);
    return toSuccess({ res, data, message: 'Login successfull!' });
  })
);

auth.post(
  '/register',
  celebrate({ [Segments.BODY]: registerSchema }),
  tracedAsyncHandler(async function register(req: Request, res: Response) {
    const data = await service.register(req.body);
    return toSuccess({
      res,
      data,
      message: 'Registration successfull!'
    });
  })
);

auth.post(
  '/refresh-token',
  celebrate({ [Segments.BODY]: refreshTokenSchema }),
  tracedAsyncHandler(async function refreshToken(req: Request, res: Response) {
    const data = await service.refreshUserTokens(req.body.refresh_token);
    return toSuccess({ res, data, message: 'Token refresh successfull!' });
  })
);

auth.get(
  '/current',
  tracedAsyncHandler(function getAuthUser(req: Request, res: Response) {
    delete req.user.password;
    return toSuccess({ res, data: req.user, message: 'Auth user fetched successfully!' });
  })
);

auth.post(
  '/logout',
  tracedAsyncHandler(async function logout(req: Request, res: Response) {
    await service.logout(req.token);
    return toSuccess({ res, message: 'Logout successfull!' });
  })
);

export default auth;
