import { Post } from './models';

export const createPost = (post: IPost): Promise<IPost> => {
  return Post.repository().save(post);
};

export const getAllPosts = (opts: QueryOptions) => {
  return Post.repository().paginate(opts);
};
