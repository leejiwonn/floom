import type { Music } from '~/types/Music';
import type { Review } from '~/types/Review';
import type { RoomCategory } from '~/types/RoomCategory';
import type { UserSimple } from '~/types/User';

export type RoomLight = 'ONE' | 'TWO' | 'THREE';
export type RoomWallColor = 'YELLOW' | 'BLUE' | 'GREEN' | 'RED' | 'PURPLE';

export type RoomAsset = {
  type: 'image';
  url: string;
};

export type RoomSimple = {
  id: number;
  title: string;
  category: RoomCategory;
  light: RoomLight;
  wallColor: RoomWallColor;
  assets: RoomAsset[];
  tags: string[];
  roomImage: string;
  creator: UserSimple;
  createdAt: string;
  updatedAt: string;
};

export type Room = RoomSimple & {
  musics: Music[];
  reviews: Review[];
};
