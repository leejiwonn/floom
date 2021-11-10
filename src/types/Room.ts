import type { Background } from '~/constants/background';
import type { Music } from '~/types/Music';
import type { RoomCategory } from '~/types/RoomCategory';
import type { UserSimple } from '~/types/User';

export type RoomLight = 'ONE' | 'TWO' | 'THREE';
export type RoomWallColor = 'YELLOW' | 'BLUE' | 'GREEN' | 'RED' | 'PURPLE';
export type RoomObject =
  | 'board'
  | 'clock'
  | 'light'
  | 'poster'
  | 'speaker'
  | 'table'
  | 'vase'
  | 'wall';
export type RoomObjectId = {
  board: 1 | 2 | 3;
  clock: 1 | 2 | 3;
  light: 1 | 2 | 3;
  poster: 1 | 2 | 3;
  speaker: 1 | 2 | 3;
  table: 1 | 2 | 3;
  vase: 1 | 2 | 3;
  wall: 1 | 2 | 3;
};

export type RoomAsset = {
  type: 'image' | 'video';
  url: string;
  filename?: string;
};

export type RoomSimple = {
  id: number;
  title: string;
  description: string;
  category: RoomCategory;
  light: RoomLight;
  wallColor: RoomWallColor;
  objectIds: RoomObjectId;
  background: Background;
  assets: RoomAsset[];
  tags: string[];
  roomImage: string;
  creator: UserSimple;
  guestBooksEnabled: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateRoomData = Pick<
  Room,
  | 'title'
  | 'description'
  | 'light'
  | 'wallColor'
  | 'objectIds'
  | 'background'
  | 'assets'
  | 'tags'
  | 'roomImage'
  | 'guestBooksEnabled'
> & {
  categoryId: RoomCategory['id'];
  musicIds: Array<Music['id']>;
};

export type Room = RoomSimple & {
  reviewsCount: number;
  recommendReviewsCount: number;
  bookmarksCount: number;
  isBookmarked?: boolean;
  musics: Music[];
};

export type RoomBookmark = Pick<
  RoomSimple,
  'id' | 'title' | 'creator' | 'assets' | 'tags'
>;
