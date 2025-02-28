import { default as crypto } from 'crypto';
import { traced } from '@sliit-foss/functions';
import * as repository from '../../repository';
import { hashPasswordIfProvided } from './helpers';

const layer = 'repository';

export const createUser = async (user: IUser) => {
  if (!user.password) user.password = crypto.randomBytes(6).toString('hex');
  await hashPasswordIfProvided(user);
  return traced[layer](repository.createUser)(user);
};

export const getUsers = (retrievalOptions: QueryOptions) => {
  return traced[layer](repository.getAllUsers)(retrievalOptions);
};

export const getUserById = (id: string) => repository.getUserById(id);

export const updateUserById = async (id: string, data: Partial<IUser>) => {
  await hashPasswordIfProvided(data);
  return traced[layer](repository.updateUserById)(id, data);
};

export const deleteUserById = (id: string) => {
  return traced[layer](repository.deleteUserById)(id);
};
