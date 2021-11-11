type RoomAssetName =
  | 'VASE'
  | 'CLOCK'
  | 'LIGHT'
  | 'BOARD'
  | 'POSTER'
  | 'SPEAKER'
  | 'TABLE'
  | 'CURTAIN'
  | 'WALL';

type RoomAssets = Record<RoomAssetName, Record<number, string>>;

const ROOM: RoomAssets = {
  VASE: {
    1: '/assets/images/rooms/vase-1.png',
    2: '/assets/images/rooms/vase-2.png',
    3: '/assets/images/rooms/vase-3.png',
  },
  CLOCK: {
    1: '/assets/images/rooms/clock-1.png',
    2: '/assets/images/rooms/clock-2.png',
    3: '/assets/images/rooms/clock-3.png',
  },
  LIGHT: {
    1: '/assets/images/rooms/light-1.png',
    2: '/assets/images/rooms/light-2.png',
    3: '/assets/images/rooms/light-3.png',
  },
  BOARD: { 1: '/assets/images/rooms/board-1.png' },
  POSTER: {
    1: '/assets/images/rooms/poster-1.png',
    2: '/assets/images/rooms/poster-2.png',
    3: '/assets/images/rooms/poster-3.png',
  },
  SPEAKER: {
    1: '/assets/images/rooms/speaker-1.png',
    2: '/assets/images/rooms/speaker-2.png',
    3: '/assets/images/rooms/speaker-3.png',
  },
  TABLE: {
    1: '/assets/images/rooms/table-1.png',
    2: '/assets/images/rooms/table-2.png',
    3: '/assets/images/rooms/table-3.png',
  },
  CURTAIN: {
    1: '/assets/images/rooms/curtain-1.png',
  },
  WALL: {
    1: '/assets/images/rooms/wall-1.png',
  },
};

export default ROOM;
