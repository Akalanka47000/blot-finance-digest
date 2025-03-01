import type {
  CurrentConfig,
  ICurrentUserResponse,
  ILoginResponse,
  ILogoutResponse,
  IRefreshResponse,
  IRegisterResponse,
  LoginConfig,
  LogoutConfig,
  RefreshConfig,
  RegisterConfig
} from '@/types';
import { instance } from './core';
import { resetTokens, saveTokens } from './core/util';

function login({ v = 'v1', data, options }: LoginConfig) {
  return instance.post<ILoginResponse>(`/api/${v}/auth/login`, data, options).then((res) => {
    saveTokens(res.data);
    return res;
  });
}

function register({ v = 'v1', data, options }: RegisterConfig) {
  return instance.post<IRegisterResponse>(`/api/${v}/auth/register`, data, options).then((res) => {
    saveTokens(res.data);
    return res;
  });
}

function current({ v = 'v1', options }: CurrentConfig = {}) {
  return instance.get<ICurrentUserResponse>(`/api/${v}/auth/current`, options).catch((error) => {
    resetTokens();
    return Promise.reject(error);
  });
}

function refresh({ v = 'v1', data, options }: RefreshConfig) {
  return instance
    .post<IRefreshResponse>(`/api/${v}/auth/refresh-token`, data, options)
    .then((res) => {
      saveTokens(res.data.data);
      return res;
    })
    .catch((error) => {
      resetTokens();
      throw error;
    });
}

function logout({ v = 'v1', options }: LogoutConfig = {}) {
  return instance.post<ILogoutResponse>(`/api/${v}/auth/logout`, undefined, options).then((res) => {
    resetTokens();
    return res;
  });
}

export default {
  login,
  register,
  current,
  refresh,
  logout
};
