import express, { Request, Response } from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { celebrate, Segments } from 'celebrate';
import { cache, cacheSuccess, internal, toSuccess } from '@/middleware';
import { idSchema } from '@/utils';
import { createUserSchema, updateUserSchema } from './schema';
import * as service from './service';

const user = express.Router();

user.post(
  '/',
  internal,
  celebrate({ [Segments.BODY]: createUserSchema }),
  tracedAsyncHandler(async function createUser(req: Request, res: Response) {
    const data = await service.createUser(req.body);
    return toSuccess({ res, data, message: 'User created successfully!' });
  })
);

user.get(
  '/',
  internal,
  tracedAsyncHandler(async function getUsers(req: Request, res: Response) {
    const data = await service.getUsers(req.query);
    return toSuccess({ res, data, message: 'Users fetched successfully!' });
  })
);

user.get(
  '/:id',
  internal,
  cacheSuccess('30 seconds'),
  celebrate({ [Segments.PARAMS]: idSchema }),
  tracedAsyncHandler(async function getUserById(req: Request, res: Response) {
    req.apicacheGroup = req.params.id;
    const data = await service.getUserById(req.params.id);
    return toSuccess({ res, data, message: 'User fetched successfully!' });
  })
);

user.patch(
  '/:id',
  internal,
  celebrate({ [Segments.PARAMS]: idSchema, [Segments.BODY]: updateUserSchema }),
  tracedAsyncHandler(async function updateUserById(req: Request, res: Response) {
    const data = await service.updateUserById(req.params.id, req.body, req.user);
    cache.clear(req.params.id);
    return toSuccess({ res, data, message: 'User updated successfully!' });
  })
);

user.delete(
  '/:id',
  internal,
  celebrate({ [Segments.PARAMS]: idSchema }),
  tracedAsyncHandler(async function deleteUserById(req: Request, res: Response) {
    await service.deleteUserById(req.params.id, req.user);
    return toSuccess({ res, message: 'User deleted successfully!' });
  })
);

export default user;
