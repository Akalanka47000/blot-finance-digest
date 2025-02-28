import { redirect } from 'next/navigation';
import { headers } from '@shared/constants';
import { default as axios } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN, REFRESH_TOKEN, ROUTE_LOGIN } from '@/constants';
import { default as authService } from '../auth';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

instance.defaults.headers.post['Content-Type'] = 'application/json';

instance.interceptors.request.use((req) => {
  let token: string | null | undefined = undefined;
  if (typeof window !== 'undefined') {
    if (!token && typeof localStorage === 'object') {
      token = localStorage.getItem(ACCESS_TOKEN);
      if (req.url === endpoints.CURRENT.replace(':version', 'v1') && !token) {
        return Promise.reject(new Error('Missing access token'));
      }
    }
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
      try {
        const decoded = jwtDecode<IUser>(token);
        req.headers[headers.userId] = decoded._id;
        req.headers[headers.userEmail] = decoded.email;
        req.headers[headers.userRole] = decoded.role;
      } catch (error) {
        // do nothing
      }
    }
    req.headers[headers.correlationId] = window.crypto.randomUUID();
  } else {
    req.headers[headers.serviceRequestKey] = process.env.SERVICE_REQUEST_KEY;
  }
  return req;
});

function formatError(error: any) {
  if (error.response) {
    return {
      status: error.response?.status,
      message: error.response?.data?.message
    };
  } else if (error.request) {
    return {
      status: error.request?.status,
      message: error.request?.response?.message
    };
  }
  return {
    status: 0,
    message: 'Network Error'
  };
}

instance.interceptors.response.use(
  (res) => res.data.data ?? res.data,
  async (error) => {
    let token: string | null | undefined = undefined;

    const original = error.config;
    if (typeof localStorage === 'object') {
      const refresh = localStorage.getItem(REFRESH_TOKEN);
      if (
        error.response?.status === 401 &&
        error.response?.data?.message === 'Token has expired' &&
        !original._retry &&
        refresh
      ) {
        original._retry = true;
        try {
          const response = await authService.refresh({
            data: { refresh_token: refresh },
            options: {
              _retry: true
            }
          });
          token = response.access_token;
          original.headers.Authorization = `Bearer ${token}`;
          const secondOriginalResponse = await axios(original);
          return secondOriginalResponse.data.data ?? secondOriginalResponse.data;
        } catch (err: any) {
          if (err.response?.status === 401 || err.message === 'Token has expired') {
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
            redirect(ROUTE_LOGIN);
          }
          return Promise.reject(formatError(error));
        }
      }
    }
    return Promise.reject(formatError(error));
  }
);

export { instance };
