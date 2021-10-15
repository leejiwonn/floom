export type Room = {
  id: string;
  title: string;
  creator: string;
  screen: string;
  light: string;
  music: string[];
  tags: string[];
  playCount: number;
  recommendCount: number;
  usedUsers: UsedUser[];
};

type UsedUser = {
  objective: string;
  player: string;
  comment: string;
};
