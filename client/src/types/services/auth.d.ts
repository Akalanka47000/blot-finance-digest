import { RequestConfig } from './common';

export interface LoginConfig extends RequestConfig {
  data: any;
}

export interface ILoginResponse {
  message: string;
  data: {
    user: IUser;
    access_token: string;
    refresh_token: string;
  }
}

export interface RegisterConfig extends RequestConfig {
  data: any;
}

export interface IRegisterResponse extends ILoginResponse { }

export interface CurrentConfig extends RequestConfig { }

export interface ICurrentUserResponse {
  message: string;
  data: IUser;
}

export interface RefreshConfig extends RequestConfig {
  data: any;
}

export interface IRefreshResponse {
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
  }
}

export interface LogoutConfig extends RequestConfig { }

export interface ILogoutResponse {
  message: string;
}
