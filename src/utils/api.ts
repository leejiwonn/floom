import axios, { AxiosError } from 'axios';
import { isServer } from '~/utils/is';
import { getAuthTokenFromLocalStorage } from './auth';

const AUTHORIZATION_HEADER_PREFIX = 'Bearer';

const api = axios.create({
  baseURL: isServer() ? 'http://localhost:3000' : undefined,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (!isServer()) {
    const authToken = getAuthTokenFromLocalStorage();

    console.log('???', authToken);

    if (config.headers.Authorization == null && authToken != null) {
      config.headers.Authorization = `${AUTHORIZATION_HEADER_PREFIX} ${authToken}`;
    }
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

export default api;
