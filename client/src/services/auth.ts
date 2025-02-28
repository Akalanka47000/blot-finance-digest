import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants';
import {
  CurrentConfig,
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

function login({ v = 'v1', data, options }: LoginConfig): Promise<ILoginResponse> {
  return instance.post(endpoints.LOGIN.replace(':version', v), data, options).then((res: any) => {
    localStorage.setItem(ACCESS_TOKEN, res.access_token);
    localStorage.setItem(REFRESH_TOKEN, res.refresh_token);
    return res as ILoginResponse;
  });
}

function register({ v = 'v1', data, options }: RegisterConfig): Promise<IRegisterResponse> {
  return instance.post(endpoints.REGISTER.replace(':version', v), data, options);
}

function current(config?: CurrentConfig): Promise<IUser> {
  const v = config?.v ?? 'v1';
  const options = config?.options ?? {};
  return instance
    .get(endpoints.CURRENT.replace(':version', v), options)
    .then((res: any) => res as IUser)
    .catch((error) => {
      resetTokens();
      return Promise.reject(error);
    });
}

function refresh({ v = 'v1', data, options }: RefreshConfig): Promise<IRefreshResponse> {
  return instance
    .post(endpoints.REFRESH.replace(':version', v), data, options)
    .then((res: any) => {
      localStorage.setItem(ACCESS_TOKEN, res.access_token);
      localStorage.setItem(REFRESH_TOKEN, res.refresh_token);
      return res as IRefreshResponse;
    })
    .catch((error) => {
      resetTokens();
      return Promise.reject(error);
    });
}

function logout(config?: LogoutConfig): Promise<ILogoutResponse> {
  const v = config?.v ?? 'v1';
  const options = config?.options ?? {};
  return instance.post(endpoints.LOGOUT.replace(':version', v), undefined, options).then(() => {
    resetTokens();
    return { message: 'Logged out successfully' };
  });
}

function resetTokens() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

export default {
  login,
  register,
  current,
  refresh,
  logout,
  resetTokens
};
