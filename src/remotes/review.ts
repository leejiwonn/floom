import type { CreateReviewData, Review } from '~/types/Review';
import api from '~/utils/api';

export async function postReview(payload: CreateReviewData) {
  const { data } = await api.post<Review>(`/api/reviews`, payload);

  return data;
}
