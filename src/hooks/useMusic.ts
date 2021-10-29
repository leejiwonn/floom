import useSWR from 'swr';
import { fetchMusics } from '~/remotes/music';

export const useMusics = (categoryId?: number) =>
  useSWR(['fetchMusics', categoryId], (_, categoryId) =>
    fetchMusics(categoryId),
  );
