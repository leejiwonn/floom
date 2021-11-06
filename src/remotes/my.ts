import type { Review } from '~/types/Review';
import api from '~/utils/api';

export async function fetchMyReviews() {
  const { data } = await api.get<Review[]>(`/api/my/reviews`);

  return data;
}
