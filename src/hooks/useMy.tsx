import useSWR from 'swr';
import { fetchMyReviews, fetchMyRooms } from '~/remotes/my';

export const useMyReviews = () => useSWR('fetchMyReviews', fetchMyReviews);

export const useMyRooms = () => useSWR('fetchMyRooms', fetchMyRooms);
