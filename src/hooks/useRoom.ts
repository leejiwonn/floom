import useSWR from 'swr';
import { fetchRooms } from '~/remotes/room';

export const useRooms = (categoryName?: string) =>
  useSWR(['fetchRooms', categoryName], (_, categoryName) =>
    fetchRooms(categoryName),
  );
