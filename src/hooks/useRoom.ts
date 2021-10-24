import useSWR from 'swr';
import { RoomSimple } from '~/types/Room';

import api from '~/utils/api';

export const useRooms = (categoryName?: string) =>
  useSWR(['getCategoryRooms', categoryName], async () => {
    const { data } = await api.get<RoomSimple[]>(
      categoryName != null
        ? `/api/rooms?categoryName=${categoryName}`
        : '/api/rooms',
    );

    return data;
  });
