const BasicColor = {
  BLUE110: '#4F75EE',
  BLUE100: '#587BFA',
  BLUE97: '#5e80ff',
  BLUE90: '#728FF6',
  BLUE80: '#98AFF9',
  BLUE40: '#DFE9FB',
  BLUE20: '#E3ECFC',
  BLUE10: '#ECF1FA',
  BLUE05: '#F5F9FF',

  GRAY100: '#C4C0B6',
  GRAY70: '#E1E1E1',
  GRAY60: '#EAE8E4',
  GRAY20: '#F9F9F9',
  GRAY10: '#ECECEC',

  DARK100: '#333333',
  DARK70: '#777777',
  DARK40: '#BDBDBD',
  DARK10: '#F0F0F0',

  GREEN150: '#1D696D',
  GREEN120: '#49C294',
  GREEN100: '#5CE8A4',
  GREEN60: '#6EE0AA',
  GREEN20: '#D1ECE0',
  GREEN10: '#E8F5EF',

  RED: '#FF4768',
  YELLOW: '#FFEC44',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
} as const;

const GradientColor = {
  BLUE: 'linear-gradient(to bottom right, #6A8AFF 0%, #4F73F3 100%)',
  GREEN: 'linear-gradient(to bottom right, #5CE8A4 0%, #3BD88D 100%)',
  GRAY: 'linear-gradient(180deg, #C4C0B6 0%, #ADA89C 100%)',
} as const;

const WallColor = {
  RED_ONE: '#E18382',
  RED_TWO: '#AB4846',
  RED_THREE: '#871F23',
  YELLOW_ONE: '#F9AF10',
  YELLOW_TWO: '#E89B10',
  YELLOW_THREE: '#D16C00',
  GREEN_ONE: '#648B5A',
  GREEN_TWO: '#407348',
  GREEN_THREE: '#1C4226',
  BLUE_ONE: '#607D9D',
  BLUE_TWO: '#23488F',
  BLUE_THREE: '#001D5D',
  PURPLE_ONE: '#9C6CD0',
  PURPLE_TWO: '#7533BC',
  PURPLE_THREE: '#44008D',
} as const;

type BasicColor = typeof BasicColor[keyof typeof BasicColor];
type GradientColor = typeof GradientColor[keyof typeof GradientColor];
type WallColor = typeof WallColor[keyof typeof WallColor];

export const getWallColor = (wallColor: string, light?: string) => {
  return light
    ? WallColor[(wallColor + `_${light}`) as keyof typeof WallColor]
    : WallColor[(wallColor + '_ONE') as keyof typeof WallColor];
};

export { BasicColor, GradientColor, WallColor };
