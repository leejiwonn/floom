import { Paginated, PaginationOptions } from '~/types/pagination';
import type { CreateRoomData, Room } from '~/types/Room';
import { RoomSimple } from '~/types/Room';
import type { RoomCategory } from '~/types/RoomCategory';
import { RoomGuestBook } from '~/types/RoomGuestBook';
import api from '~/utils/api';
import { createQueryString } from '~/utils/queryString';

export async function fetchRoom(roomId: number) {
  const { data } = await api.get<Room>(`/api/rooms/${roomId}`);

  return data;
}

export async function fetchRooms(categoryName?: string) {
  const { data } = await api.get<RoomSimple[]>(
    categoryName != null
      ? `/api/rooms?categoryName=${categoryName}`
      : '/api/rooms',
  );

  return data;
}

export async function createRoom(payload: CreateRoomData) {
  const { data } = await api.post<Room>('/api/rooms', payload);

  return data;
}

export async function fetchRoomCategories() {
  const { data } = await api.get<RoomCategory[]>('/api/rooms/categories');

  return data;
}

export type FetchRoomGuestBooksParams = Partial<PaginationOptions> & {
  roomId: number;
};

export async function fetchRoomGuestBooks({
  roomId,
  ...options
}: FetchRoomGuestBooksParams) {
  const url = `/api/rooms/${roomId}/guest-books${createQueryString(options)}`;
  const { data } = await api.get<Paginated<RoomGuestBook>>(url);

  return data;
}
