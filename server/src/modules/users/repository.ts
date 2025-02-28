import { User } from './models';

export const createUser = (user: IUser): Promise<IUser> => {
  user.email &&= user.email.toLowerCase();
  return User.repository()
    .save(user)
    .then((user) => {
      return User.cleanse(user);
    });
};

export const getUserByEmail = async (email: string, plain = false): Promise<IUser> => {
  const user = await User.repository().findOneBy({ email });
  if (plain) return user;
  return User.cleanse(user);
};

export const getUserById = async (id: string, plain = false): Promise<IUser> => {
  const user = await User.repository().findOneBy({ id });
  if (plain) return user;
  return User.cleanse(user);
};

export const getAllUsers = (opts: QueryOptions) => {
  return User.repository().paginate(opts);
};

export const updateUserById = (id: string, data: Partial<IUser>): Promise<IUser> => {
  data.email &&= data.email.toLowerCase();
  return User.repository()
    .update(id, data)
    .then(() => {
      return User.repository()
        .findOneBy({ id })
        .then((user) => {
          return User.cleanse(user);
        });
    });
};

export const deleteUserById = (id: string) => {
  return User.repository().delete(id);
};
