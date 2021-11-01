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
  Record<RoomLight, Record<RoomAssetName, Record<number, string>>>
>;

const ROOM: RoomAssets = {
  RED: {
    ONE: {
      VASE: {
        1: '/assets/images/rooms/red-one-vase-1.png',
        2: '/assets/images/rooms/red-one-vase-2.png',
      },
      CLOCK: {
        1: '/assets/images/rooms/red-one-clock-1.png',
        2: '/assets/images/rooms/red-one-clock-2.png',
        3: '/assets/images/rooms/red-one-clock-3.png',
      },
      LIGHT: {
        1: '/assets/images/rooms/red-one-light-1.png',
        2: '/assets/images/rooms/red-one-light-2.png',
        3: '/assets/images/rooms/red-one-light-3.png',
      },
      BOARD: {
        1: '/assets/images/rooms/red-one-board-1.png',
      },
      POSTER: {
        1: '/assets/images/rooms/red-one-poster-1.png',
        3: '/assets/images/rooms/red-one-poster-3.png',
      },
      SPEAKER: {
        1: '/assets/images/rooms/red-one-speaker-1.png',
        2: '/assets/images/rooms/red-one-speaker-2.png',
        3: '/assets/images/rooms/red-one-speaker-3.png',
      },
      TABLE: {
        1: '/assets/images/rooms/red-one-table-1.png',
        2: '/assets/images/rooms/red-one-table-2.png',
        3: '/assets/images/rooms/red-one-table-3.png',
      },
      WALL: {
        1: '/assets/images/rooms/red-one-wall-1.png',
      },
    },
    TWO: {
      VASE: {
        1: '/assets/images/rooms/red-two-vase-1.png',
        2: '/assets/images/rooms/red-two-vase-2.png',
      },
      CLOCK: {
        1: '/assets/images/rooms/red-two-clock-1.png',
        2: '/assets/images/rooms/red-two-clock-2.png',
        3: '/assets/images/rooms/red-two-clock-3.png',
      },
      LIGHT: {
        1: '/assets/images/rooms/red-two-light-1.png',
        2: '/assets/images/rooms/red-two-light-2.png',
        3: '/assets/images/rooms/red-two-light-3.png',
      },
      BOARD: {
        1: '/assets/images/rooms/red-two-board-1.png',
      },
      POSTER: {
        1: '/assets/images/rooms/red-two-poster-1.png',
        2: '/assets/images/rooms/red-two-poster-3.png',
      },
      SPEAKER: {
        1: '/assets/images/rooms/red-two-speaker-1.png',
        2: '/assets/images/rooms/red-two-speaker-2.png',
        3: '/assets/images/rooms/red-two-speaker-3.png',
      },
      TABLE: {
        1: '/assets/images/rooms/red-two-table-1.png',
        2: '/assets/images/rooms/red-two-table-2.png',
        3: '/assets/images/rooms/red-two-table-3.png',
      },
      WALL: {
        1: '/assets/images/rooms/red-two-wall-1.png',
      },
    },
    THREE: {
      VASE: {
        1: '/assets/images/rooms/red-three-vase-1.png',
        2: '/assets/images/rooms/red-three-vase-2.png',
      },
      CLOCK: {
        1: '/assets/images/rooms/red-three-clock-1.png',
        2: '/assets/images/rooms/red-three-clock-2.png',
        3: '/assets/images/rooms/red-three-clock-3.png',
      },
      LIGHT: {
        1: '/assets/images/rooms/red-three-light-1.png',
        2: '/assets/images/rooms/red-three-light-2.png',
        3: '/assets/images/rooms/red-three-light-3.png',
      },
      BOARD: {
        1: '/assets/images/rooms/red-three-board-1.png',
      },
      POSTER: {
        1: '/assets/images/rooms/red-three-poster-1.png',
        2: '/assets/images/rooms/red-three-poster-3.png',
      },
      SPEAKER: {
        1: '/assets/images/rooms/red-three-speaker-1.png',
        2: '/assets/images/rooms/red-three-speaker-2.png',
        3: '/assets/images/rooms/red-three-speaker-3.png',
      },
      TABLE: {
        1: '/assets/images/rooms/red-three-table-1.png',
        2: '/assets/images/rooms/red-three-table-2.png',
        3: '/assets/images/rooms/red-three-table-3.png',
      },
      WALL: {
        1: '/assets/images/rooms/red-three-wall-1.png',
      },
    },
  },
  YELLOW: {
    ONE: {
      VASE: {
        1: '/assets/images/rooms/yellow-one-vase-1.png',
        2: '/assets/images/rooms/yellow-one-vase-2.png',
      },
      CLOCK: {
        1: '/assets/images/rooms/yellow-one-clock-1.png',
        2: '/assets/images/rooms/yellow-one-clock-2.png',
        3: '/assets/images/rooms/yellow-one-clock-3.png',
      },
      LIGHT: {
        1: '/assets/images/rooms/yellow-one-light-1.png',
        2: '/assets/images/rooms/yellow-one-light-2.png',
        3: '/assets/images/rooms/yellow-one-light-3.png',
      },
      BOARD: {
        1: '/assets/images/rooms/yellow-one-board-1.png',
      },
      POSTER: {
        1: '/assets/images/rooms/yellow-one-poster-1.png',
        2: '/assets/images/rooms/yellow-one-poster-3.png',
      },
      SPEAKER: {
        1: '/assets/images/rooms/yellow-one-speaker-1.png',
        2: '/assets/images/rooms/yellow-one-speaker-2.png',
        3: '/assets/images/rooms/yellow-one-speaker-3.png',
      },
      TABLE: {
        1: '/assets/images/rooms/yellow-one-table-1.png',
        2: '/assets/images/rooms/yellow-one-table-2.png',
        3: '/assets/images/rooms/yellow-one-table-3.png',
      },
      WALL: {
        1: '/assets/images/rooms/yellow-one-wall-1.png',
      },
    },
    TWO: {
      VASE: {
        1: '/assets/images/rooms/yellow-two-vase-1.png',
        2: '/assets/images/rooms/yellow-two-vase-2.png',
      },
      CLOCK: {
        1: '/assets/images/rooms/yellow-two-clock-1.png',
        2: '/assets/images/rooms/yellow-two-clock-2.png',
        3: '/assets/images/rooms/yellow-two-clock-3.png',
      },
      LIGHT: {
        1: '/assets/images/rooms/yellow-two-light-1.png',
        2: '/assets/images/rooms/yellow-two-light-2.png',
        3: '/assets/images/rooms/yellow-two-light-3.png',
      },
      BOARD: {
        1: '/assets/images/rooms/yellow-two-board-1.png',
      },
      POSTER: {
        1: '/assets/images/rooms/yellow-two-poster-1.png',
        2: '/assets/images/rooms/yellow-two-poster-3.png',
      },
      SPEAKER: {
        1: '/assets/images/rooms/yellow-two-speaker-1.png',
        2: '/assets/images/rooms/yellow-two-speaker-2.png',
        3: '/assets/images/rooms/yellow-two-speaker-3.png',
      },
      TABLE: {
        1: '/assets/images/rooms/yellow-two-table-1.png',
        2: '/assets/images/rooms/yellow-two-table-2.png',
        3: '/assets/images/rooms/yellow-two-table-3.png',
      },
      WALL: {
        1: '/assets/images/rooms/yellow-two-wall-1.png',
      },
    },
    THREE: {
      VASE: {
        1: '/assets/images/rooms/yellow-three-vase-1.png',
        2: '/assets/images/rooms/yellow-three-vase-2.png',
      },
      CLOCK: {
        1: '/assets/images/rooms/yellow-three-clock-1.png',
        2: '/assets/images/rooms/yellow-three-clock-2.png',
        3: '/assets/images/rooms/yellow-three-clock-3.png',
      },
      LIGHT: {
        1: '/assets/images/rooms/yellow-three-light-1.png',
        2: '/assets/images/rooms/yellow-three-light-2.png',
        3: '/assets/images/rooms/yellow-three-light-3.png',
      },
      BOARD: {
        1: '/assets/images/rooms/yellow-three-board-1.png',
      },
      POSTER: {
        1: '/assets/images/rooms/yellow-three-poster-1.png',
        2: '/assets/images/rooms/yellow-three-poster-3.png',
      },
      SPEAKER: {
        1: '/assets/images/rooms/yellow-three-speaker-1.png',
        2: '/assets/images/rooms/yellow-three-speaker-2.png',
        3: '/assets/images/rooms/yellow-three-speaker-3.png',
      },
      TABLE: {
        1: '/assets/images/rooms/yellow-three-table-1.png',
        2: '/assets/images/rooms/yellow-three-table-2.png',
        3: '/assets/images/rooms/yellow-three-table-3.png',
      },
      WALL: {
        1: '/assets/images/rooms/yellow-three-wall-1.png',
      },
    },
  },
  GREEN: {
    ONE: {
      VASE: {
        1: '/assets/images/rooms/green-one-vase-1.png',
        2: '/assets/images/rooms/green-one-vase-2.png',
      },
      CLOCK: {
        1: '/assets/images/rooms/green-one-clock-1.png',
        2: '/assets/images/rooms/green-one-clock-2.png',
        3: '/assets/images/rooms/green-one-clock-3.png',
      },
      LIGHT: {
        1: '/assets/images/rooms/green-one-light-1.png',
        2: '/assets/images/rooms/green-one-light-2.png',
        3: '/assets/images/rooms/green-one-light-3.png',
      },
      BOARD: {
        1: '/assets/images/rooms/green-one-board-1.png',
      },
      POSTER: {
        1: '/assets/images/rooms/green-one-poster-1.png',
        2: '/assets/images/rooms/green-one-poster-3.png',
      },
      SPEAKER: {
        1: '/assets/images/rooms/green-one-speaker-1.png',
        2: '/assets/images/rooms/green-one-speaker-2.png',
        3: '/assets/images/rooms/green-one-speaker-3.png',
      },
      TABLE: {
        1: '/assets/images/rooms/green-one-table-1.png',
        2: '/assets/images/rooms/green-one-table-2.png',
        3: '/assets/images/rooms/green-one-table-3.png',
      },
      WALL: {
        1: '/assets/images/rooms/green-one-wall-1.png',
      },
    },
    TWO: {
      VASE: {
        1: '/assets/images/rooms/green-two-vase-1.png',
        2: '/assets/images/rooms/green-two-vase-2.png',
      },
      CLOCK: {
        1: '/assets/images/rooms/green-two-clock-1.png',
        2: '/assets/images/rooms/green-two-clock-2.png',
        3: '/assets/images/rooms/green-two-clock-3.png',
      },
      LIGHT: {
        1: '/assets/images/rooms/green-two-light-1.png',
        2: '/assets/images/rooms/green-two-light-2.png',
        3: '/assets/images/rooms/green-two-light-3.png',
      },
      BOARD: {
        1: '/assets/images/rooms/green-two-board-1.png',
      },
      POSTER: {
        1: '/assets/images/rooms/green-two-poster-1.png',
        2: '/assets/images/rooms/green-two-poster-3.png',
      },
      SPEAKER: {
        1: '/assets/images/rooms/green-two-speaker-1.png',
        2: '/assets/images/rooms/green-two-speaker-2.png',
        3: '/assets/images/rooms/green-two-speaker-3.png',
      },
      TABLE: {
        1: '/assets/images/rooms/green-two-table-1.png',
        2: '/assets/images/rooms/green-two-table-2.png',
        3: '/assets/images/rooms/green-two-table-3.png',
      },
      WALL: {
        1: '/assets/images/rooms/green-two-wall-1.png',
      },
    },
    THREE: {
      VASE: {
        1: '/assets/images/rooms/green-three-vase-1.png',
        2: '/assets/images/rooms/green-three-vase-2.png',
      },
      CLOCK: {
        1: '/assets/images/rooms/green-three-clock-1.png',
        2: '/assets/images/rooms/green-three-clock-2.png',
        3: '/assets/images/rooms/green-three-clock-3.png',
      },
      LIGHT: {
        1: '/assets/images/rooms/green-three-light-1.png',
        2: '/assets/images/rooms/green-three-light-2.png',
        3: '/assets/images/rooms/green-three-light-3.png',
      },
      BOARD: {
        1: '/assets/images/rooms/green-three-board-1.png',
      },
      POSTER: {
        1: '/assets/images/rooms/green-three-poster-1.png',
        2: '/assets/images/rooms/green-three-poster-3.png',
      },
      SPEAKER: {
        1: '/assets/images/rooms/green-three-speaker-1.png',
        2: '/assets/images/rooms/green-three-speaker-2.png',
        3: '/assets/images/rooms/green-three-speaker-3.png',
      },
      TABLE: {
        1: '/assets/images/rooms/green-three-table-1.png',
        2: '/assets/images/rooms/green-three-table-2.png',
        3: '/assets/images/rooms/green-three-table-3.png',
      },
      WALL: {
        1: '/assets/images/rooms/green-three-wall-1.png',
      },
    },
  },
  BLUE: {
    ONE: {
      VASE: {
        1: '/assets/images/rooms/blue-one-vase-1.png',
        2: '/assets/images/rooms/blue-one-vase-2.png',
      },
      CLOCK: {
        1: '/assets/images/rooms/blue-one-clock-1.png',
        2: '/assets/images/rooms/blue-one-clock-2.png',
        3: '/assets/images/rooms/blue-one-clock-3.png',
      },
      LIGHT: {
        1: '/assets/images/rooms/blue-one-light-1.png',
        2: '/assets/images/rooms/blue-one-light-2.png',
        3: '/assets/images/rooms/blue-one-light-3.png',
      },
      BOARD: {
        1: '/assets/images/rooms/blue-one-board-1.png',
      },
      POSTER: {
        1: '/assets/images/rooms/blue-one-poster-1.png',
        2: '/assets/images/rooms/blue-one-poster-3.png',
      },
      SPEAKER: {
        1: '/assets/images/rooms/blue-one-speaker-1.png',
        2: '/assets/images/rooms/blue-one-speaker-2.png',
        3: '/assets/images/rooms/blue-one-speaker-3.png',
      },
      TABLE: {
        1: '/assets/images/rooms/blue-one-table-1.png',
        2: '/assets/images/rooms/blue-one-table-2.png',
        3: '/assets/images/rooms/blue-one-table-3.png',
      },
      WALL: {
        1: '/assets/images/rooms/blue-one-wall-1.png',
      },
    },
    TWO: {
      VASE: {
        1: '/assets/images/rooms/blue-two-vase-1.png',
        2: '/assets/images/rooms/blue-two-vase-2.png',
      },
      CLOCK: {
        1: '/assets/images/rooms/blue-two-clock-1.png',
        2: '/assets/images/rooms/blue-two-clock-2.png',
        3: '/assets/images/rooms/blue-two-clock-3.png',
      },
      LIGHT: {
        1: '/assets/images/rooms/blue-two-light-1.png',
        2: '/assets/images/rooms/blue-two-light-2.png',
        3: '/assets/images/rooms/blue-two-light-3.png',
      },
      BOARD: {
        1: '/assets/images/rooms/blue-two-board-1.png',
      },
      POSTER: {
        1: '/assets/images/rooms/blue-two-poster-1.png',
        3: '/assets/images/rooms/blue-two-poster-3.png',
      },
      SPEAKER: {
        1: '/assets/images/rooms/blue-two-speaker-1.png',
        2: '/assets/images/rooms/blue-two-speaker-2.png',
        3: '/assets/images/rooms/blue-two-speaker-3.png',
      },
      TABLE: {
        1: '/assets/images/rooms/blue-two-table-1.png',
        2: '/assets/images/rooms/blue-two-table-2.png',
        3: '/assets/images/rooms/blue-two-table-3.png',
      },
      WALL: {
        1: '/assets/images/rooms/blue-two-wall-1.png',
      },
    },
    THREE: {
      VASE: {
        1: '/assets/images/rooms/blue-three-vase-1.png',
        2: '/assets/images/rooms/blue-three-vase-2.png',
      },
      CLOCK: {
        1: '/assets/images/rooms/blue-three-clock-1.png',
        2: '/assets/images/rooms/blue-three-clock-2.png',
        3: '/assets/images/rooms/blue-three-clock-3.png',
      },
      LIGHT: {
        1: '/assets/images/rooms/blue-three-light-1.png',
        2: '/assets/images/rooms/blue-three-light-2.png',
        3: '/assets/images/rooms/blue-three-light-3.png',
      },
      BOARD: {
        1: '/assets/images/rooms/blue-three-board-1.png',
      },
      POSTER: {
        1: '/assets/images/rooms/blue-three-poster-1.png',
        3: '/assets/images/rooms/blue-three-poster-3.png',
      },
      SPEAKER: {
        1: '/assets/images/rooms/blue-three-speaker-1.png',
        2: '/assets/images/rooms/blue-three-speaker-2.png',
        3: '/assets/images/rooms/blue-three-speaker-3.png',
      },
      TABLE: {
        1: '/assets/images/rooms/blue-three-table-1.png',
        2: '/assets/images/rooms/blue-three-table-2.png',
        3: '/assets/images/rooms/blue-three-table-3.png',
      },
      WALL: {
        1: '/assets/images/rooms/blue-three-wall-1.png',
      },
    },
  },
  PURPLE: {
    ONE: {
      VASE: {
        1: '/assets/images/rooms/purple-one-vase-1.png',
        2: '/assets/images/rooms/purple-one-vase-2.png',
      },
      CLOCK: {
        1: '/assets/images/rooms/purple-one-clock-1.png',
        2: '/assets/images/rooms/purple-one-clock-2.png',
        3: '/assets/images/rooms/purple-one-clock-3.png',
      },
      LIGHT: {
        1: '/assets/images/rooms/purple-one-light-1.png',
        2: '/assets/images/rooms/purple-one-light-2.png',
        3: '/assets/images/rooms/purple-one-light-3.png',
      },
      BOARD: {
        1: '/assets/images/rooms/purple-one-board-1.png',
      },
      POSTER: {
        1: '/assets/images/rooms/purple-one-poster-1.png',
        2: '/assets/images/rooms/purple-one-poster-3.png',
      },
      SPEAKER: {
        1: '/assets/images/rooms/purple-one-speaker-1.png',
        2: '/assets/images/rooms/purple-one-speaker-2.png',
        3: '/assets/images/rooms/purple-one-speaker-3.png',
      },
      TABLE: {
        1: '/assets/images/rooms/purple-one-table-1.png',
        2: '/assets/images/rooms/purple-one-table-2.png',
        3: '/assets/images/rooms/purple-one-table-3.png',
      },
      WALL: {
        1: '/assets/images/rooms/purple-one-wall-1.png',
      },
    },
    TWO: {
      VASE: {
        1: '/assets/images/rooms/purple-two-vase-1.png',
        2: '/assets/images/rooms/purple-two-vase-2.png',
      },
      CLOCK: {
        1: '/assets/images/rooms/purple-two-clock-1.png',
        2: '/assets/images/rooms/purple-two-clock-2.png',
        3: '/assets/images/rooms/purple-two-clock-3.png',
      },
      LIGHT: {
        1: '/assets/images/rooms/purple-two-light-1.png',
        2: '/assets/images/rooms/purple-two-light-2.png',
        3: '/assets/images/rooms/purple-two-light-3.png',
      },
      BOARD: {
        1: '/assets/images/rooms/purple-two-board-1.png',
      },
      POSTER: {
        1: '/assets/images/rooms/purple-two-poster-1.png',
        3: '/assets/images/rooms/purple-two-poster-3.png',
      },
      SPEAKER: {
        1: '/assets/images/rooms/purple-two-speaker-1.png',
        2: '/assets/images/rooms/purple-two-speaker-2.png',
        3: '/assets/images/rooms/purple-two-speaker-3.png',
      },
      TABLE: {
        1: '/assets/images/rooms/purple-two-table-1.png',
        2: '/assets/images/rooms/purple-two-table-2.png',
        3: '/assets/images/rooms/purple-two-table-3.png',
      },
      WALL: {
        1: '/assets/images/rooms/purple-two-wall-1.png',
      },
    },
    THREE: {
      VASE: {
        1: '/assets/images/rooms/purple-three-vase-1.png',
        2: '/assets/images/rooms/purple-three-vase-2.png',
      },
      CLOCK: {
        1: '/assets/images/rooms/purple-three-clock-1.png',
        2: '/assets/images/rooms/purple-three-clock-2.png',
        3: '/assets/images/rooms/purple-three-clock-3.png',
      },
      LIGHT: {
        1: '/assets/images/rooms/purple-three-light-1.png',
        2: '/assets/images/rooms/purple-three-light-2.png',
        3: '/assets/images/rooms/purple-three-light-3.png',
      },
      BOARD: {
        1: '/assets/images/rooms/purple-three-board-1.png',
      },
      POSTER: {
        1: '/assets/images/rooms/purple-three-poster-1.png',
        2: '/assets/images/rooms/purple-three-poster-3.png',
      },
      SPEAKER: {
        1: '/assets/images/rooms/purple-three-speaker-1.png',
        2: '/assets/images/rooms/purple-three-speaker-2.png',
        3: '/assets/images/rooms/purple-three-speaker-3.png',
      },
      TABLE: {
        1: '/assets/images/rooms/purple-three-table-1.png',
        2: '/assets/images/rooms/purple-three-table-2.png',
        3: '/assets/images/rooms/purple-three-table-3.png',
      },
      WALL: {
        1: '/assets/images/rooms/purple-three-wall-1.png',
      },
    },
  },
};

export default ROOM;
