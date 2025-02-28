// import { default as crypto } from 'crypto';
// import { forbiddenRouteError } from '@/middleware';
// import { traced } from '@sliit-foss/functions';
// import { default as bcrypt } from 'bcryptjs';
// import { default as createError } from 'http-errors';
// import { default as config } from '@/config';
// import * as repository from '../../repository';
// import { hashPasswordIfProvided } from './helpers';

// const layer = 'repository';

// export const createUser = async (user: IUser) => {
//   let autoGeneratatedPassword: string;
//   if (!user.password && !user.linked_accounts?.length && user.role !== Role.Guest)
//     user.password = autoGeneratatedPassword = crypto.randomBytes(6).toString('hex');
//   await hashPasswordIfProvided(user);
//   user.email &&= user.email.toLowerCase();
//   return traced[layer](repository.createUser)(user);
// };

// export const getUsers = (retrievalOptions) => {
//   return traced[layer](repository.getAllUsers)(retrievalOptions);
// };

// export const getUserById = (id: string) => repository.getUserById(id);

// export const updateUserById = async (id: string, data: Partial<IUser>, user?: IUser) => {
//   await hashPasswordIfProvided(data);
//   expireCodeIfPresent({ _id: id, ...data });
//   data.email &&= data.email.toLowerCase();
//   if (user && data.role && ![Role.Agent, Role.Gatekeeper].includes(data.role)) {
//     data['entity_access.events'] = [];
//     data['entity_access.movies'] = [];
//   }
//   return traced[layer](repository.updateUserById)(id, data);
// };

// export const deleteUserById = async (id: string, user?: IUser) => {
//   if (user) {
//     const targetUser = await repository.getUserById(id, true);
//     if (Cyborg.isConsumer(targetUser)) throw forbiddenRouteError;
//   }
//   return traced[layer](repository.deleteUserById)(id);
// };
