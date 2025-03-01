import { ICreatePostResponse, IGetPostsResponse, RequestConfig, RequestCreateConfig } from '@/types';
import { instance } from './core';

function getPosts({ v = 'v1', options }: RequestConfig) {
  return instance.get<IGetPostsResponse>(`/api/${v}/posts`, options);
}

function createPost({ v = 'v1', data, options }: RequestCreateConfig) {
  return instance.post<ICreatePostResponse>(`/api/${v}/posts`, data, options);
}

export default { getPosts, createPost };
