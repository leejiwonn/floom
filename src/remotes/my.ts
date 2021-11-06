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
