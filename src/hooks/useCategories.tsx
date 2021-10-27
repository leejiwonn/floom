import useSWR from 'swr';
import { MusicCategory } from '~/types/MusicCategory';
import { RoomCategory } from '~/types/RoomCategory';
import api from '~/utils/api';

export const useRoomCategories = () =>
  useSWR('getRoomCategories', async () => {
    const { data } = await api.get<RoomCategory[]>('/api/rooms/categories');

    return data;
  });

export const useMusicCategories = () =>
  useSWR('getMusicCategories', async () => {
    const { data } = await api.get<MusicCategory[]>('/api/musics/categories');

    return data;
  });
