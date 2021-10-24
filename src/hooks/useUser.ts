import useSWR from 'swr';
import { User } from '~/types/User';

import api, { isAxiosError } from '~/utils/api';
import { saveAuthTokenInLocalStorage } from '~/utils/auth';

export const useUserProfile = () =>
  useSWR('getUserProfile', async () => {
    try {
      const { data } = await api.get<User>(`/api/user`);

      saveAuthTokenInLocalStorage(data.authToken);

      return data;
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        return null;
      }
      throw error;
    }
  });
