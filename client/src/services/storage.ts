import { IUploadFileResponse, RequestCreateConfig } from '@/types';
import { instance } from './core';

function uploadFiles({ v = 'v1', data, options }: RequestCreateConfig) {
  return instance.post<IUploadFileResponse>(`/api/${v}/storage`, data, {
    headers: { 'Content-Type': 'multipart/form-data', ...options?.headers },
    ...options
  });
}

export default { uploadFiles };
