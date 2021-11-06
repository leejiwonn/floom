import { Bookmark } from '~/types/Bookmark';
import type { Review } from '~/types/Review';
import { RoomSimple } from '~/types/Room';
import api from '~/utils/api';

export async function fetchMyReviews() {
  const { data } = await api.get<Review[]>(`/api/my/reviews`);

  return data;
}

export async function fetchMyRooms() {
  const { data } = await api.get<RoomSimple[]>(`/api/my/rooms`);

  return data;
}

export async function fetchMyRoomBookmarks() {
  const { data } = await api.get<Bookmark[]>(`/api/my/room-bookmarks`);

  return data;
}

export async function postRoomBookmark(roomId: number) {
  const { data } = await api.post<Review>(
    `/api/my/room-bookmarks?roomId=${roomId}`,
  );

  return data;
}
