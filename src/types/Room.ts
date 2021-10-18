export type Room = {
  id: string;
  title: string;
  creator: string;
  roomImage: string;
  screen: string[];
  light: string;
  music: string[];
  tags: string[];
  playCount: number;
  recommendCount: number;
  usedUsers: UsedUser[];
  wallColor: string;
};

type UsedUser = {
  objective: string;
  player: string;
  comment: string;
  recommend: boolean;
};
