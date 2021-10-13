import { useQuery } from 'react-query';

import api from '~/utils/api';

export const useUserProfile = () =>
  useQuery('getUserProfile', async () => {
    try {
      const { data } = await api.get(`/api/user`);
      return data;
    } catch (error) {
      console.warn(error);
    }
  });
