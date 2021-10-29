import useSWR from 'swr';
import { fetchMusicCategories } from '~/remotes/music';
import { fetchRoomCategories } from '~/remotes/room';

export const useRoomCategories = () =>
  useSWR('fetchRoomCategories', fetchRoomCategories);

export const useMusicCategories = () =>
  useSWR('fetchMusicCategories', fetchMusicCategories);
