import type { RoomLight, RoomWallColor } from '~/types/Room';

type RoomAssetName =
  | 'VASE'
  | 'CLOCK'
  | 'LIGHT'
  | 'MEMO'
  | 'PICTURE'
  | 'CONSOLE'
  | 'SPEAKER'
  | 'TABLE'
  | 'WALL';

type RoomAssets = Record<
  RoomWallColor,
  Record<RoomLight, Record<RoomAssetName, string>>
>;

const ROOM: RoomAssets = {
  RED: {
    ONE: {
      VASE: '/assets/images/rooms/red-1-vase.png',
      CLOCK: '/assets/images/rooms/red-1-clock.png',
      LIGHT: '/assets/images/rooms/red-1-light.png',
      MEMO: '/assets/images/rooms/red-1-memo.png',
      PICTURE: '/assets/images/rooms/red-1-picture.png',
      CONSOLE: '/assets/images/rooms/red-1-console.png',
      SPEAKER: '/assets/images/rooms/red-1-speaker.png',
      TABLE: '/assets/images/rooms/red-1-table.png',
      WALL: '/assets/images/rooms/red-1-wall.png',
    },
    TWO: {
      VASE: '/assets/images/rooms/red-2-vase.png',
      CLOCK: '/assets/images/rooms/red-2-clock.png',
      LIGHT: '/assets/images/rooms/red-2-light.png',
      MEMO: '/assets/images/rooms/red-2-memo.png',
      PICTURE: '/assets/images/rooms/red-2-picture.png',
      CONSOLE: '/assets/images/rooms/red-2-console.png',
      SPEAKER: '/assets/images/rooms/red-2-speaker.png',
      TABLE: '/assets/images/rooms/red-2-table.png',
      WALL: '/assets/images/rooms/red-2-wall.png',
    },
    THREE: {
      VASE: '/assets/images/rooms/red-3-vase.png',
      CLOCK: '/assets/images/rooms/red-3-clock.png',
      LIGHT: '/assets/images/rooms/red-3-light.png',
      MEMO: '/assets/images/rooms/red-3-memo.png',
      PICTURE: '/assets/images/rooms/red-3-picture.png',
      CONSOLE: '/assets/images/rooms/red-3-console.png',
      SPEAKER: '/assets/images/rooms/red-3-speaker.png',
      TABLE: '/assets/images/rooms/red-3-table.png',
      WALL: '/assets/images/rooms/red-3-wall.png',
    },
  },
  YELLOW: {
    ONE: {
      VASE: '/assets/images/rooms/purple-1-vase.png',
      CLOCK: '/assets/images/rooms/purple-1-clock.png',
      LIGHT: '/assets/images/rooms/purple-1-light.png',
      MEMO: '/assets/images/rooms/purple-1-memo.png',
      PICTURE: '/assets/images/rooms/purple-1-picture.png',
      CONSOLE: '/assets/images/rooms/purple-1-console.png',
      SPEAKER: '/assets/images/rooms/purple-1-speaker.png',
      TABLE: '/assets/images/rooms/purple-1-table.png',
      WALL: '/assets/images/rooms/purple-1-wall.png',
    },
    TWO: {
      VASE: '/assets/images/rooms/purple-2-vase.png',
      CLOCK: '/assets/images/rooms/purple-2-clock.png',
      LIGHT: '/assets/images/rooms/purple-2-light.png',
      MEMO: '/assets/images/rooms/purple-2-memo.png',
      PICTURE: '/assets/images/rooms/purple-2-picture.png',
      CONSOLE: '/assets/images/rooms/purple-2-console.png',
      SPEAKER: '/assets/images/rooms/purple-2-speaker.png',
      TABLE: '/assets/images/rooms/purple-2-table.png',
      WALL: '/assets/images/rooms/purple-2-wall.png',
    },
    THREE: {
      VASE: '/assets/images/rooms/purple-3-vase.png',
      CLOCK: '/assets/images/rooms/purple-3-clock.png',
      LIGHT: '/assets/images/rooms/purple-3-light.png',
      MEMO: '/assets/images/rooms/purple-3-memo.png',
      PICTURE: '/assets/images/rooms/purple-3-picture.png',
      CONSOLE: '/assets/images/rooms/purple-3-console.png',
      SPEAKER: '/assets/images/rooms/purple-3-speaker.png',
      TABLE: '/assets/images/rooms/purple-3-table.png',
      WALL: '/assets/images/rooms/purple-3-wall.png',
    },
  },
  GREEN: {
    ONE: {
      VASE: '/assets/images/rooms/red-1-vase.png',
      CLOCK: '/assets/images/rooms/red-1-clock.png',
      LIGHT: '/assets/images/rooms/red-1-light.png',
      MEMO: '/assets/images/rooms/red-1-memo.png',
      PICTURE: '/assets/images/rooms/red-1-picture.png',
      CONSOLE: '/assets/images/rooms/red-1-console.png',
      SPEAKER: '/assets/images/rooms/red-1-speaker.png',
      TABLE: '/assets/images/rooms/red-1-table.png',
      WALL: '/assets/images/rooms/red-1-wall.png',
    },
    TWO: {
      VASE: '/assets/images/rooms/red-2-vase.png',
      CLOCK: '/assets/images/rooms/red-2-clock.png',
      LIGHT: '/assets/images/rooms/red-2-light.png',
      MEMO: '/assets/images/rooms/red-2-memo.png',
      PICTURE: '/assets/images/rooms/red-2-picture.png',
      CONSOLE: '/assets/images/rooms/red-2-console.png',
      SPEAKER: '/assets/images/rooms/red-2-speaker.png',
      TABLE: '/assets/images/rooms/red-2-table.png',
      WALL: '/assets/images/rooms/red-2-wall.png',
    },
    THREE: {
      VASE: '/assets/images/rooms/red-3-vase.png',
      CLOCK: '/assets/images/rooms/red-3-clock.png',
      LIGHT: '/assets/images/rooms/red-3-light.png',
      MEMO: '/assets/images/rooms/red-3-memo.png',
      PICTURE: '/assets/images/rooms/red-3-picture.png',
      CONSOLE: '/assets/images/rooms/red-3-console.png',
      SPEAKER: '/assets/images/rooms/red-3-speaker.png',
      TABLE: '/assets/images/rooms/red-3-table.png',
      WALL: '/assets/images/rooms/red-3-wall.png',
    },
  },
  BLUE: {
    ONE: {
      VASE: '/assets/images/rooms/purple-1-vase.png',
      CLOCK: '/assets/images/rooms/purple-1-clock.png',
      LIGHT: '/assets/images/rooms/purple-1-light.png',
      MEMO: '/assets/images/rooms/purple-1-memo.png',
      PICTURE: '/assets/images/rooms/purple-1-picture.png',
      CONSOLE: '/assets/images/rooms/purple-1-console.png',
      SPEAKER: '/assets/images/rooms/purple-1-speaker.png',
      TABLE: '/assets/images/rooms/purple-1-table.png',
      WALL: '/assets/images/rooms/purple-1-wall.png',
    },
    TWO: {
      VASE: '/assets/images/rooms/purple-2-vase.png',
      CLOCK: '/assets/images/rooms/purple-2-clock.png',
      LIGHT: '/assets/images/rooms/purple-2-light.png',
      MEMO: '/assets/images/rooms/purple-2-memo.png',
      PICTURE: '/assets/images/rooms/purple-2-picture.png',
      CONSOLE: '/assets/images/rooms/purple-2-console.png',
      SPEAKER: '/assets/images/rooms/purple-2-speaker.png',
      TABLE: '/assets/images/rooms/purple-2-table.png',
      WALL: '/assets/images/rooms/purple-2-wall.png',
    },
    THREE: {
      VASE: '/assets/images/rooms/purple-3-vase.png',
      CLOCK: '/assets/images/rooms/purple-3-clock.png',
      LIGHT: '/assets/images/rooms/purple-3-light.png',
      MEMO: '/assets/images/rooms/purple-3-memo.png',
      PICTURE: '/assets/images/rooms/purple-3-picture.png',
      CONSOLE: '/assets/images/rooms/purple-3-console.png',
      SPEAKER: '/assets/images/rooms/purple-3-speaker.png',
      TABLE: '/assets/images/rooms/purple-3-table.png',
      WALL: '/assets/images/rooms/purple-3-wall.png',
    },
  },
  PURPLE: {
    ONE: {
      VASE: '/assets/images/rooms/purple-1-vase.png',
      CLOCK: '/assets/images/rooms/purple-1-clock.png',
      LIGHT: '/assets/images/rooms/purple-1-light.png',
      MEMO: '/assets/images/rooms/purple-1-memo.png',
      PICTURE: '/assets/images/rooms/purple-1-picture.png',
      CONSOLE: '/assets/images/rooms/purple-1-console.png',
      SPEAKER: '/assets/images/rooms/purple-1-speaker.png',
      TABLE: '/assets/images/rooms/purple-1-table.png',
      WALL: '/assets/images/rooms/purple-1-wall.png',
    },
    TWO: {
      VASE: '/assets/images/rooms/purple-2-vase.png',
      CLOCK: '/assets/images/rooms/purple-2-clock.png',
      LIGHT: '/assets/images/rooms/purple-2-light.png',
      MEMO: '/assets/images/rooms/purple-2-memo.png',
      PICTURE: '/assets/images/rooms/purple-2-picture.png',
      CONSOLE: '/assets/images/rooms/purple-2-console.png',
      SPEAKER: '/assets/images/rooms/purple-2-speaker.png',
      TABLE: '/assets/images/rooms/purple-2-table.png',
      WALL: '/assets/images/rooms/purple-2-wall.png',
    },
    THREE: {
      VASE: '/assets/images/rooms/purple-3-vase.png',
      CLOCK: '/assets/images/rooms/purple-3-clock.png',
      LIGHT: '/assets/images/rooms/purple-3-light.png',
      MEMO: '/assets/images/rooms/purple-3-memo.png',
      PICTURE: '/assets/images/rooms/purple-3-picture.png',
      CONSOLE: '/assets/images/rooms/purple-3-console.png',
      SPEAKER: '/assets/images/rooms/purple-3-speaker.png',
      TABLE: '/assets/images/rooms/purple-3-table.png',
      WALL: '/assets/images/rooms/purple-3-wall.png',
    },
  },
};

export default ROOM;
