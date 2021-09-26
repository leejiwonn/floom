import { useQuery } from 'react-query';
import axios from 'axios';

import { Room } from '../types/Room';

export const useCategoryRooms = (category: string) =>
  useQuery(
    ['getCategoryRooms', category],
    async () =>
      await axios
        .get<Room[]>(`/api/rooms?category=${category}`)
        .then((res) => res.data),
  );

export const useRoom = (category: string, id: string) => {
  return useQuery(
    ['getRoom', category, id],
    async () =>
      await axios
        .get<Room>(`/api/rooms?category=${category}&id=${id}`)
        .then((res) => res.data),
  );
};
