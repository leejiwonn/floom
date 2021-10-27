import type { RoomLight, RoomWallColor } from '~/types/Room';

type RoomAssetName =
  | 'VASE'
  | 'CLOCK'
  | 'LIGHT'
  | 'BOARD'
  | 'POSTER'
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
      BOARD: '/assets/images/rooms/red-1-board.png',
      POSTER: '/assets/images/rooms/red-1-poster.png',
      SPEAKER: '/assets/images/rooms/red-1-speaker.png',
      TABLE: '/assets/images/rooms/red-1-table.png',
      WALL: '/assets/images/rooms/red-1-wall.png',
    },
    TWO: {
      VASE: '/assets/images/rooms/red-2-vase.png',
      CLOCK: '/assets/images/rooms/red-2-clock.png',
      LIGHT: '/assets/images/rooms/red-2-light.png',
      BOARD: '/assets/images/rooms/red-2-board.png',
      POSTER: '/assets/images/rooms/red-2-poster.png',
      SPEAKER: '/assets/images/rooms/red-2-speaker.png',
      TABLE: '/assets/images/rooms/red-2-table.png',
      WALL: '/assets/images/rooms/red-2-wall.png',
    },
    THREE: {
      VASE: '/assets/images/rooms/red-3-vase.png',
      CLOCK: '/assets/images/rooms/red-3-clock.png',
      LIGHT: '/assets/images/rooms/red-3-light.png',
      BOARD: '/assets/images/rooms/red-3-board.png',
      POSTER: '/assets/images/rooms/red-3-poster.png',
      SPEAKER: '/assets/images/rooms/red-3-speaker.png',
      TABLE: '/assets/images/rooms/red-3-table.png',
      WALL: '/assets/images/rooms/red-3-wall.png',
    },
  },
  YELLOW: {
    ONE: {
      VASE: '/assets/images/rooms/yellow-1-vase.png',
      CLOCK: '/assets/images/rooms/yellow-1-clock.png',
      LIGHT: '/assets/images/rooms/yellow-1-light.png',
      BOARD: '/assets/images/rooms/yellow-1-board.png',
      POSTER: '/assets/images/rooms/yellow-1-poster.png',
      SPEAKER: '/assets/images/rooms/yellow-1-speaker.png',
      TABLE: '/assets/images/rooms/yellow-1-table.png',
      WALL: '/assets/images/rooms/yellow-1-wall.png',
    },
    TWO: {
      VASE: '/assets/images/rooms/yellow-2-vase.png',
      CLOCK: '/assets/images/rooms/yellow-2-clock.png',
      LIGHT: '/assets/images/rooms/yellow-2-light.png',
      BOARD: '/assets/images/rooms/yellow-2-board.png',
      POSTER: '/assets/images/rooms/yellow-2-poster.png',
      SPEAKER: '/assets/images/rooms/yellow-2-speaker.png',
      TABLE: '/assets/images/rooms/yellow-2-table.png',
      WALL: '/assets/images/rooms/yellow-2-wall.png',
    },
    THREE: {
      VASE: '/assets/images/rooms/yellow-3-vase.png',
      CLOCK: '/assets/images/rooms/yellow-3-clock.png',
      LIGHT: '/assets/images/rooms/yellow-3-light.png',
      BOARD: '/assets/images/rooms/yellow-3-board.png',
      POSTER: '/assets/images/rooms/yellow-3-poster.png',
      SPEAKER: '/assets/images/rooms/yellow-3-speaker.png',
      TABLE: '/assets/images/rooms/yellow-3-table.png',
      WALL: '/assets/images/rooms/yellow-3-wall.png',
    },
  },
  GREEN: {
    ONE: {
      VASE: '/assets/images/rooms/green-1-vase.png',
      CLOCK: '/assets/images/rooms/green-1-clock.png',
      LIGHT: '/assets/images/rooms/green-1-light.png',
      BOARD: '/assets/images/rooms/green-1-board.png',
      POSTER: '/assets/images/rooms/green-1-poster.png',
      SPEAKER: '/assets/images/rooms/green-1-speaker.png',
      TABLE: '/assets/images/rooms/green-1-table.png',
      WALL: '/assets/images/rooms/green-1-wall.png',
    },
    TWO: {
      VASE: '/assets/images/rooms/green-2-vase.png',
      CLOCK: '/assets/images/rooms/green-2-clock.png',
      LIGHT: '/assets/images/rooms/green-2-light.png',
      BOARD: '/assets/images/rooms/green-2-board.png',
      POSTER: '/assets/images/rooms/green-2-poster.png',
      SPEAKER: '/assets/images/rooms/green-2-speaker.png',
      TABLE: '/assets/images/rooms/green-2-table.png',
      WALL: '/assets/images/rooms/green-2-wall.png',
    },
    THREE: {
      VASE: '/assets/images/rooms/green-3-vase.png',
      CLOCK: '/assets/images/rooms/green-3-clock.png',
      LIGHT: '/assets/images/rooms/green-3-light.png',
      BOARD: '/assets/images/rooms/green-3-board.png',
      POSTER: '/assets/images/rooms/green-3-poster.png',
      SPEAKER: '/assets/images/rooms/green-3-speaker.png',
      TABLE: '/assets/images/rooms/green-3-table.png',
      WALL: '/assets/images/rooms/green-3-wall.png',
    },
  },
  BLUE: {
    ONE: {
      VASE: '/assets/images/rooms/blue-1-vase.png',
      CLOCK: '/assets/images/rooms/blue-1-clock.png',
      LIGHT: '/assets/images/rooms/blue-1-light.png',
      BOARD: '/assets/images/rooms/blue-1-board.png',
      POSTER: '/assets/images/rooms/blue-1-poster.png',
      SPEAKER: '/assets/images/rooms/blue-1-speaker.png',
      TABLE: '/assets/images/rooms/blue-1-table.png',
      WALL: '/assets/images/rooms/blue-1-wall.png',
    },
    TWO: {
      VASE: '/assets/images/rooms/blue-2-vase.png',
      CLOCK: '/assets/images/rooms/blue-2-clock.png',
      LIGHT: '/assets/images/rooms/blue-2-light.png',
      BOARD: '/assets/images/rooms/blue-2-board.png',
      POSTER: '/assets/images/rooms/blue-2-poster.png',
      SPEAKER: '/assets/images/rooms/blue-2-speaker.png',
      TABLE: '/assets/images/rooms/blue-2-table.png',
      WALL: '/assets/images/rooms/blue-2-wall.png',
    },
    THREE: {
      VASE: '/assets/images/rooms/blue-3-vase.png',
      CLOCK: '/assets/images/rooms/blue-3-clock.png',
      LIGHT: '/assets/images/rooms/blue-3-light.png',
      BOARD: '/assets/images/rooms/blue-3-board.png',
      POSTER: '/assets/images/rooms/blue-3-poster.png',
      SPEAKER: '/assets/images/rooms/blue-3-speaker.png',
      TABLE: '/assets/images/rooms/blue-3-table.png',
      WALL: '/assets/images/rooms/blue-3-wall.png',
    },
  },
  PURPLE: {
    ONE: {
      VASE: '/assets/images/rooms/purple-1-vase.png',
      CLOCK: '/assets/images/rooms/purple-1-clock.png',
      LIGHT: '/assets/images/rooms/purple-1-light.png',
      BOARD: '/assets/images/rooms/purple-1-board.png',
      POSTER: '/assets/images/rooms/purple-1-poster.png',
      SPEAKER: '/assets/images/rooms/purple-1-speaker.png',
      TABLE: '/assets/images/rooms/purple-1-table.png',
      WALL: '/assets/images/rooms/purple-1-wall.png',
    },
    TWO: {
      VASE: '/assets/images/rooms/purple-2-vase.png',
      CLOCK: '/assets/images/rooms/purple-2-clock.png',
      LIGHT: '/assets/images/rooms/purple-2-light.png',
      BOARD: '/assets/images/rooms/purple-2-board.png',
      POSTER: '/assets/images/rooms/purple-2-poster.png',
      SPEAKER: '/assets/images/rooms/purple-2-speaker.png',
      TABLE: '/assets/images/rooms/purple-2-table.png',
      WALL: '/assets/images/rooms/purple-2-wall.png',
    },
    THREE: {
      VASE: '/assets/images/rooms/purple-3-vase.png',
      CLOCK: '/assets/images/rooms/purple-3-clock.png',
      LIGHT: '/assets/images/rooms/purple-3-light.png',
      BOARD: '/assets/images/rooms/purple-3-board.png',
      POSTER: '/assets/images/rooms/purple-3-poster.png',
      SPEAKER: '/assets/images/rooms/purple-3-speaker.png',
      TABLE: '/assets/images/rooms/purple-3-table.png',
      WALL: '/assets/images/rooms/purple-3-wall.png',
    },
  },
};

export default ROOM;
