import useSWR from 'swr';
import { RoomCategory } from '~/types/RoomCategory';
import api from '~/utils/api';

export const useCategories = () =>
  useSWR('getCategories', async () => {
    const { data } = await api.get<RoomCategory[]>('/api/rooms/categories');

    return data;
  });
