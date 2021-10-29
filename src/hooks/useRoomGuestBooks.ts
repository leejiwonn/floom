import { useMemo } from 'react';
import { KeyLoader } from 'swr';
import useSWRInfinite, { SWRInfiniteConfiguration } from 'swr/infinite';
import { fetchRoomGuestBooks, FetchRoomGuestBooksParams } from '~/remotes/room';
import { Paginated } from '~/types/pagination';
import { RoomGuestBook } from '~/types/RoomGuestBook';

type Data = Paginated<RoomGuestBook>;

const createKey =
  (roomId: number, limit?: number): KeyLoader<Data> =>
  (pageIndex, prev) => {
    // 마지막 페이지
    if (prev != null && prev.meta.currentPage === prev.meta.totalPages) {
      return null;
    }

    const params: FetchRoomGuestBooksParams = {
      roomId,
      page: pageIndex + 1,
      limit,
    };

    return ['fetchRoomGuestBooks', JSON.stringify(params)];
  };

const fetcher = (_: unknown, params: string) => {
  return fetchRoomGuestBooks(JSON.parse(params));
};

type Options = SWRInfiniteConfiguration<Data> & {
  limit?: number;
};

export function useRoomGuestBooks(
  roomId: number,
  { limit, ...options }: Options = {},
) {
  const key = useMemo(() => createKey(roomId, limit), [roomId, limit]);

  return useSWRInfinite(key, fetcher, options);
}
