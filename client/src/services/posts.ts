import { RequestConfig, RequestCreateConfig } from '@/types';
import { instance } from './core';

function getPosts<T>({ v = 'v1', options }: RequestConfig): Promise<T> {
  return instance.get(`/api/${v}/posts`, options);
}

function createPost({ v = 'v1', data, options }: RequestCreateConfig): Promise<IPost> {
  return instance.post(`/api/${v}/posts`, data, options);
}

export default { getPosts, createPost };
