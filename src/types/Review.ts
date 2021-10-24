import type { UserSimple } from '~/types/User';

export type Review = {
  id: number;
  author?: UserSimple;
  guestName?: string;
  objective: string;
  comment: string;
  recommend: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateReviewData = {
  roomId: number;
  objective: string;
  comment: string;
  recommend: boolean;
};
