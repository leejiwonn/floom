import { useQuery } from 'react-query';

import api from '~/utils/api';

export const useUserProfile = (userId: string) =>
  useQuery(
    ['getUserProfile', userId],
    async () => await api.get(`/api/user`).then((res) => res.data),
  );
