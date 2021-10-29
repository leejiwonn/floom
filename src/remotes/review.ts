import type { CreateReviewData, Review } from '~/types/Review';
import api from '~/utils/api';
import { createQueryString } from '~/utils/queryString';

export async function fetchReviews(roomId?: number) {
  const { data } = await api.get<Review[]>(
    `/api/reviews${createQueryString({ roomId })}`,
  );

  return data;
}

export async function postReview(payload: CreateReviewData) {
  const { data } = await api.post<Review>(`/api/reviews`, payload);

  return data;
}
