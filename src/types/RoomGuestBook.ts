import type { UserSimple } from '~/types/User';

export type RoomGuestBook = {
  id: number;
  author?: UserSimple;
  guestName?: string;
  emoji?: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateRoomGuestBookData = {
  emoji?: string;
  body: string;
};
