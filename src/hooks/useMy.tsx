import useSWR from 'swr';
import {
  fetchMyReviews,
  fetchMyRooms,
  fetchMyRoomBookmarks,
} from '~/remotes/my';

export const useMyReviews = () => useSWR('fetchMyReviews', fetchMyReviews);

export const useMyRooms = () => useSWR('fetchMyRooms', fetchMyRooms);

export const useMyRoomBookmarks = () =>
  useSWR('fetchMyRoomBookmarks', fetchMyRoomBookmarks);
