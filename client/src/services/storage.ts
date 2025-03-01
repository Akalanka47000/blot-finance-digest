import { RequestCreateConfig } from '@/types';
import { instance } from './core';

function uploadFiles({ v = 'v1', data, options }: RequestCreateConfig): Promise<string[]> {
  return instance.post(`/api/${v}/storage/files`, data, {
    headers: { 'Content-Type': 'multipart/form-data', ...options?.headers },
    ...options
  });
}

export default { uploadFiles };
