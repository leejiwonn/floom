import useSWR from 'swr';
import { fetchReviews } from '~/remotes/review';

export const useReviews = (roomId?: number) =>
  useSWR(['fetchReviews', roomId], (_, roomId) => fetchReviews(roomId));
