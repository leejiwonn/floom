import useSWR from 'swr';
import { Music } from '~/types/Music';

import api from '~/utils/api';

export const useMusics = (categoryId?: number) =>
  useSWR(['getCategoryMusics', categoryId], async () => {
    const { data } = await api.get<Music[]>(
      categoryId != null
        ? `/api/musics?categoryId=${categoryId}`
        : '/api/musics',
    );

    return data;
  });
