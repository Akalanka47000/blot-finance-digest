import { RequestConfig } from './common';

export interface LoginConfig extends RequestConfig {
  data: any;
}

export interface ILoginResponse {
  user: IUser;
  access_token: string;
  refresh_token: string;
}

export interface RegisterConfig extends RequestConfig {
  data: any;
}

export interface IRegisterResponse {
  message: string;
}

export interface CurrentConfig extends RequestConfig {}

export interface RefreshConfig extends RequestConfig {
  data: any;
}

export interface IRefreshResponse {
  access_token: string;
  refresh_token: string;
}

export interface LogoutConfig extends RequestConfig {}

export interface ILogoutResponse {
  message: string;
}
