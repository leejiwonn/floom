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

export default axios;
