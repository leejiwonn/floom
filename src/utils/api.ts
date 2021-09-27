import axios, { AxiosError } from 'axios';
import { getAuthTokenFromLocalStorage } from './auth';

const AUTHORIZATION_HEADER_PREFIX = 'Bearer';

axios.interceptors.request.use((config) => {
  const authToken = getAuthTokenFromLocalStorage();

  if (config.headers.Authorization == null && authToken != null) {
    config.headers.Authorization = `${AUTHORIZATION_HEADER_PREFIX} ${authToken}`;
  }

  return config;
});

export function isAxiosError(error: unknown): error is AxiosError {
  return (
    typeof error === 'object' &&
    error != null &&
    (error as AxiosError).isAxiosError
  );
}

// 401 에러를 받으면 로그인 페이지로 리다이렉트
axios.interceptors.response.use(undefined, (error) => {
  if (isAxiosError(error) && error.response?.status === 401) {
    window.location.href = '/';
  }

  return Promise.reject(error);
});

export default axios;
