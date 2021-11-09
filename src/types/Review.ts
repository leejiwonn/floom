import type { UserSimple } from '~/types/User';
import { RoomCategory } from './RoomCategory';
import { ScreenData } from './screen';

export type Review = {
  id: number;
  author?: UserSimple;
  guestName?: string;
  objective: string;
  comment: string;
  recommend: boolean;
  room: {
    id: number;
    category: RoomCategory;
    title: string;
    assets: ScreenData[];
  };
  createdAt: string;
  updatedAt: string;
};

export type CreateReviewData = {
  roomId: number;
  objective: string;
  comment: string;
  recommend: boolean;
};
