// import { accessExpiredError } from '@/middleware';
// import { default as bcrypt } from 'bcryptjs';
// import { Blacklist, errors, generateTokens, verify } from '@/utils';

// export const login = async (
//   { email, password },
//   isRequestFromCustomerApp: boolean
// ) => {
//   let user: IUser;
//   const updates: Partial<IUser> = { last_login_time: new Date().toISOString() };
//   user = await getUserByEmailWithPassword(email);
//     if (!user) throw errors.invalid_credentials;
//     if (!user.password || !bcrypt.compareSync(password, user.password)) {
//       throw errors.invalid_credentials;
//     }
//   if (!user.is_active) throw errors.user_deactivated;
//   if (!user.is_verified) throw errors.unverified_user;
//   if (!isRequestFromCustomerApp && user.access_expiration && new Date(user.access_expiration) < new Date())
//     throw accessExpiredError;
//   const tokens = generateTokens(user);
//   updateUserById(user._id, updates);
//   return {
//     user,
//     ...tokens
//   };
// };

// export const register = async (user: IUser) => {
//   const existingUser = await getUserByEmail(user.email);
//   if (existingUser) throw errors.user_already_exists;
//   return createUser(user)
// };

// export const refreshUserTokens = async (token: string) => {
//   const decodedRefreshToken = verify(token);
//   const decodedUser = verify(decodedRefreshToken.access_token, true);
//   const user = await getUserById(decodedUser._id);
//   if (!user) {
//     throw errors.invalid_token;
//   }
//   if (!user.is_active) {
//     throw errors.user_deactivated;
//   }
//   return generateTokens(user);
// };

// export const logout = (token: string) => {
//   return Blacklist.add(token);
// };
