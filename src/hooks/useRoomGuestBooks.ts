import { KeyLoader } from 'swr';
import useSWRInfinite from 'swr/infinite';
import { SWRInfiniteConfiguration } from 'swr/infinite/dist/infinite/types';
import { fetchRoomGuestBooks, FetchRoomGuestBooksParams } from '~/remotes/room';
import { Paginated, PaginationOptions } from '~/types/pagination';
import { RoomGuestBook } from '~/types/RoomGuestBook';

type Data = Paginated<RoomGuestBook>;

const createKey =
  (roomId: number, limit?: number): KeyLoader<Data> =>
  (page, prev) => {
    // 마지막 페이지
    if (prev != null && prev.meta.currentPage === prev.meta.totalPages) {
      return null;
    }

    const params: FetchRoomGuestBooksParams = {
      roomId,
      page,
      limit,
    };

    return [params];
  };

type Options = Partial<Pick<PaginationOptions, 'limit'>> &
  SWRInfiniteConfiguration<Data>;

export function useRoomGuestBooks(
  roomId: number,
  { limit, ...options }: Options = {},
) {
  return useSWRInfinite(
    createKey(roomId, limit),
    (params: FetchRoomGuestBooksParams) => fetchRoomGuestBooks(params),
    options,
  );
}
