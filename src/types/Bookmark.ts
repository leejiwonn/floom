import type { UserSimple } from '~/types/User';
import { RoomBookmark } from './Room';

export type Bookmark = {
  id: number;
  marker?: UserSimple;
  room: RoomBookmark;
  createdAt: string;
  updatedAt: string;
};
