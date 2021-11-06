import useSWR from 'swr';
import { fetchMyReviews } from '~/remotes/my';

export const useMyReviews = () => useSWR('fetchMyReviews', fetchMyReviews);
